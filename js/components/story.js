import React, { Component } from 'react';
import {
    ViroARScene,
    ViroARImageMarker,
    ViroSound,
    Viro3DObject,
    ViroMaterials,
    ViroSpinner,
} from 'react-viro';

import Light from './light';

export default class Screne extends Component {
    constructor (props) {
        super(props);
        this.state = {
            objectLoaded: false,
            anchorFound: false,
            currentAnimation: 'Take 001',
        }
    }
    _onAnchorFound = () => {
        this.setState({ anchorFound: true });
    }

    _onLoadEnd = () => {
        this.setState({ objectLoaded: true });
    }

    _onClick = () => {
        this.setState({ currentAnimation: undefined }, ()=>{
            this.setState({currentAnimation: 'Take 001'});
        });
    }

    render() {
        return (
            <ViroARScene>
                <ViroARImageMarker target={this.props.target} onAnchorFound={this._onAnchorFound}>

                    { !this.state.objectLoaded && (
                        <ViroSpinner
                            rotation={[-90, 0, 0]}
                            scale={[0.1, 0.1, 0.1]}
                            materials={['green']}/>
                    )}
                    {this.props.voice && 
                        <ViroSound
                            source={this.props.voice}
                            paused={!(this.state.objectLoaded && this.state.anchorFound)}/>
                    }
                    {this.props.bgm && 
                        <ViroSound
                            source={this.props.bgm}
                            paused={false}
                            loop={true}/>
                    }
                    
                    <Light/>
                    <Viro3DObject
                        {...this.props.object}
                        type="VRX"
                        onLoadEnd={this._onLoadEnd}
                        onClick={this._onClick}
                        animation={{
                            name: this.state.currentAnimation,
                            run: this.state.objectLoaded && this.state.anchorFound,
                        }}
                    />
                    
                </ViroARImageMarker>
            </ViroARScene>
        )
    }
}

ViroMaterials.createMaterials({
    white: { diffuseColor: '#ffffff77' },
});
