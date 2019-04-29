import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {
    ViroARSceneNavigator,
    ViroARTrackingTargets,
    ViroMaterials,
} from 'react-viro';

import config from './config'

const sharedProps = {
    apiKey: config.apiKey,
}
const HOME_PAGE = 'HOME';
const LESSON_SELECTOR = 'LESSON_SELECTOR';
const SECTION_SELECTOR = 'SECTION_SELECTOR';
const VR_ENV= 'VR_ENV';
const Data = require('./js/lessons');

export default class AIbot extends Component {

    constructor () {
        super();
        this.state = {
            navigator: HOME_PAGE,
            lessonIndex: undefined,
            sectionIndex: undefined,
            ARkey: Math.random(),
        }
    }

    render () {
        return (
            <View style={localStyles.container}>
                { this.state.navigator == VR_ENV && this._renderAR() }
                { this._renderUI() }
            </View>
        )
    }

    _renderAR = () => {
        let section = Data[this.state.lessonIndex].sections[this.state.sectionIndex];
        return (
            <ViroARSceneNavigator {...sharedProps} key={this.state.ARkey}
                initialScene={{scene: section.scene}} />
        )
    }

    _renderUI = () => {
        if (this.state.navigator == HOME_PAGE) {
            return this._getHomePage();
        } else if (this.state.navigator == LESSON_SELECTOR) {
            return this._getLessonSelectorPage();
        } else if (this.state.navigator == SECTION_SELECTOR) {
            return this._getSectionSelectorPage();
        } else if (this.state.navigator == VR_ENV) {
            return this._getSectionPage();
        }
    }

    _getHomePage = () => {
        return (
            <ImageBackground source={require('./js/res/ui/bg.png')} style={localStyles.flexCenter}>
                <Image source={require('./js/res/ui/logo.png')} style={localStyles.logo}/>
                <TouchableOpacity onPress={()=>{this.setState({navigator: LESSON_SELECTOR})}}>
                    <Image source={require('./js/res/ui/start_btn.png')}/>
                </TouchableOpacity>
            </ImageBackground>
        )
    }

    _getLessonSelectorPage = () => {
        let lessons = Data.map((lesson, idx)=>{
            return (
                <View key={idx} style={{margin: 15}} style={{position: 'absolute', ...lesson.style}}>
                    <TouchableOpacity onPress={()=>{this._setLesson(idx)}}>
                        <Image source={lesson.image} style={{borderRadius: 100}}/>
                        <Text style={{textAlign: 'center', fontSize: 30, color: 'white'}}>{lesson.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        });
        return (
            <ImageBackground source={require('./js/res/ui/bg.png')} style={localStyles.flexCenter}>
                <TouchableOpacity style={localStyles.backButton} onPress={()=>this.setState({navigator: HOME_PAGE})}>
                    <Image source={require('./js/res/ui/back.png')}/>
                </TouchableOpacity>
                <ScrollView showsHorizontalScrollIndicator={false} style={{width: '100%'}}>
                    <View style={{height: 1000, backgroundColor: 'rgba(0,0,0,.1)'}}>
                        {lessons}
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }

    _getSectionSelectorPage = () => {
        let lesson = Data[this.state.lessonIndex]
        let sections = lesson.sections.map((section, idx) => {
            return (
                <TouchableOpacity onPress={()=>{this._setSection(idx)}} key={idx}>
                    <View style={{margin: 15}} style={localStyles.sectionBox}>
                        <Text>{section.page}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
        return (
            <ImageBackground source={require('./js/res/ui/bg.png')} style={localStyles.flexCenter}>
                <TouchableOpacity style={localStyles.backButton} onPress={()=>this.setState({navigator: LESSON_SELECTOR})}>
                    <Image source={require('./js/res/ui/back.png')}/>
                </TouchableOpacity>
                <View style={{ width: '100%', height: '80%' }}>
                    <ScrollView>
                        <View style={{flex: 1, flexDirection: 'row', flexWrap:'wrap', width: '100%', justifyContent: 'center'}}>{sections}</View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }

    _getSectionPage = () => {
        let section = Data[this.state.lessonIndex].sections[this.state.sectionIndex];
        return (
            <View style={localStyles.UI}>
                <TouchableOpacity style={localStyles.backButton} onPress={()=>this.setState({navigator: SECTION_SELECTOR})}>
                    <Image source={require('./js/res/ui/back.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={localStyles.nextSection}
                    onPress={this._nextSection}>
                    <Image source={require('./js/res/ui/back.png')}/>
                </TouchableOpacity>
                <Text>
                    {section.page}
                </Text>
            </View>
        )
    }

    _setLesson = (index) => {
        this.setState({
            lessonIndex: index,
            navigator: SECTION_SELECTOR,
        });
    }

    _setSection = (index) => {
        this.setState({
            sectionIndex: index,
            navigator: VR_ENV,
        });
    }

    _nextSection = () => {
        let lesson = Data[this.state.lessonIndex];
        if (this.state.sectionIndex < lesson.sections.length - 1) {
            this.setState({
                ARkey: Math.random(),
                sectionIndex: this.state.sectionIndex + 1
            });
        }
    }
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 349,
        height: 190,
    },
    backButton: {
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 1000,
    },
    nextSection: {
        position: 'absolute',
        top: 5,
        left: 55,
    },
    sectionBox: {
        backgroundColor: 'gold',
        padding: 15,
        margin: 15,
        width: 150,
        height: 150,
    },
    UI: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex:1000,
        width: '100%',
        height: '30%',
    },
})

ViroMaterials.createMaterials({
    red: { diffuseColor: '#ff0000CC' },
    green: { diffuseColor: '#00ff00CC' },
    blue: { diffuseColor: '#0000ffCC' },
    gold: { diffuseColor: '#FFDF00CC' },
    black: { diffuseColor: '#000000CC' },
});

ViroARTrackingTargets.createTargets({
    '060_en': {
        source: require('./js/res/markers/060_en.jpg'),
        orientation: 'Up',
        physicalWidth: 0.21
    },
    '061_en': {
        source: require('./js/res/markers/061_en.jpg'),
        orientation: 'Up',
        physicalWidth: 0.21
    },
    '060': {
        source: require('./js/res/markers/060.jpg'),
        orientation: 'Up',
        physicalWidth: 0.21
    },
    '061': {
        source: require('./js/res/markers/061.jpg'),
        orientation: 'Up',
        physicalWidth: 0.21
    },
    '062': {
        source: require('./js/res/markers/062.jpg'),
        orientation: 'Up',
        physicalWidth: 0.21
    },
    '062_mini': {
        source: require('./js/res/markers/062_mini.jpg'),
        orientation: 'Up',
        physicalWidth: 0.21
    },
    '064': {
        source: require('./js/res/markers/064.jpg'),
        orientation: 'Up',
        physicalWidth: 0.21
    },
});
  
module.exports = AIbot;