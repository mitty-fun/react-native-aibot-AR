import React, { Component } from 'react';
import Dialogue from './dialogue';
import {
    ViroNode,
    ViroAnimations,
    Viro3DObject,
} from 'react-viro';


export default class AIbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posX: props.posX,
            posZ: props.posZ,
            rotY: props.rotY,
            count: props.count,
            currentAnim: undefined,
            onFinish: undefined,
        }
    }

    playAnimation = (name, onFinish) => {
        this.setState({
            onFinish: () => {
                this.setState({ currentAnim: undefined }, onFinish);
            },
            currentAnim: name
        });
    }

    closeDialogue = () => {
        this.refs.talk.stop();
    }

    _showHint = () => {
        this.refs.talk.start();
    }

    render() {
        return (
            <ViroNode
                highAccuracyEvents={true}
                onClick={this._showHint}
                position={[this.state.posX, 0, this.state.posZ]}
                rotation={[0, this.state.rotY, 0]}
                animation={{
                    name: this.state.currentAnim,
                    onFinish: this.state.onFinish,
                    run: true,
                    interruptible: true
                }}>
                <Viro3DObject
                    onLoadEnd={this.props.onLoadEnd}
                    type="VRX"
                    source={require('../res/models/albert/albert_stop.vrx')}
                    resources={[require('../res/models/albert/albert.png')]}
                    animation={{name:'Take 001',
                                run:true,
                                loop:true}}
                    visible={this.state.currentAnim === undefined}
                />
                <Viro3DObject
                    type="VRX"
                    source={require('../res/models/albert/albert_walk.vrx')}
                    resources={[require('../res/models/albert/albert.png')]}
                    animation={{name:'Take 001',
                                run:true,
                                loop:true}}
                    visible={this.state.currentAnim !== undefined}
                />
                {this.props.talk && (
                    <Dialogue
                        position={[0, 5, 0]}
                        ref='talk'
                        sources={this.props.talk}
                    />
                )}
            </ViroNode>
        )
    }
}

ViroAnimations.registerAnimations({
    moveUp: { properties: { positionZ: "-=1" }, duration: 500 },
    moveDown: { properties: { positionZ: "+=1" }, duration: 500 },
    moveRight: { properties: { positionX: "+=1" }, duration: 500 },
    moveLeft: { properties: { positionX: "-=1" }, duration: 500 },
    turnRight: { properties: { rotateY: "-=90" }, duration: 500 },
    turnLeft: { properties: { rotateY: "+=90" }, duration: 500 },
});