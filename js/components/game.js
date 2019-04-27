import React, { Component } from 'react';
import {
    ViroARScene,
    ViroARImageMarker,
    ViroSound,
    ViroImage,
} from 'react-viro';

import Playground from './playground';
import Monitor from './monitor';
import Dialogue from './dialogue';

export default class Screne extends Component {

    execute = (command, execDone, execFail, execSuccess) => {
        this.refs.playground.execute(command, execDone, execFail, execSuccess);
    }
    
    reset = () => {
        this.refs.playground.reset();
    }
    
    render() {
        return (
            <ViroARScene>
                <ViroARImageMarker target={this.props.target}>
                    { this.props.bgm && <ViroSound source={this.props.bgm} paused={false}/> }
                    <Playground ref='playground'
                        {...this.props.playground}
                    />
                    <Monitor ref='monitor'
                        {...this.props.monitor}
                        execute={this.execute}
                        reset={this.reset}
                    />
                </ViroARImageMarker>
            </ViroARScene>
        )
    }
}
