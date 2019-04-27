import React, { Component } from 'react';
import {
    ViroARScene,
    ViroARImageMarker,
    ViroImage,
    ViroNode,
} from 'react-viro';


export default class Scene extends Component {
    constructor (props) {
        super(props);
        this.state = { bool: false }
    }
    render () {
        return (
            <ViroARScene>
                <ViroARImageMarker target={'060'}>
                    <ViroNode
                        position={[0, 0.05, 0]}
                        onClick={()=>{this.setState({bool: !this.state.bool})}}
                    >
                        <ViroImage
                            height={0.1}
                            width={0.1}
                            position={[0.1, 0, 0]}
                            opacity={this.state.bool ? 0.5 : 1}
                            source={require('../../res/ui/aibot.png')}
                        />
                        <ViroImage
                            height={0.1}
                            width={0.1}
                            position={[-0.1, 0, 0]}
                            opacity={this.state.bool ? 0.5 : 1}
                            source={require('../../res/ui/aibot.png')}
                        />
                    </ViroNode>
                    <ViroImage
                        height={0.1}
                        width={0.1}
                        position={[0, 0.05, 0]}
                        opacity={this.state.bool ? 0.5 : 1}
                        source={require('../../res/ui/aibot.png')}
                        onClick={()=>{this.setState({bool: !this.state.bool})}}
                    />
                </ViroARImageMarker>
            </ViroARScene>
        )
    }
}

module.exports = Scene;