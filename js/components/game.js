import React, { Component } from 'react';
import {
    ViroARScene,
    ViroARImageMarker,
    ViroSound,
} from 'react-viro';

import Playground from './playground';
import Monitor from './monitor';

export default class Screne extends Component {

    constructor () {
        super();
        this.state = {
            playgroundLoaded: false
        }
    }

    execute = (command, execDone, execFail, execSuccess) => {
        this.refs.playground.execute(command, execDone, execFail, execSuccess);
    }
    
    reset = () => {
        this.refs.playground.reset();
    }

    _playgroundLoadEnd = () => {
        this.setState({ playgroundLoaded: true });
    }
    
    render() {
        return (
            <ViroARScene>
                <ViroARImageMarker target={this.props.target}>
                    { this.props.bgm && <ViroSound source={this.props.bgm} paused={false}/> }
                    <Playground ref='playground'
                        {...this.props.playground}
                        onLoadEnd={this._playgroundLoadEnd}
                    />
                    { this.state.playgroundLoaded && (
                        <Monitor ref='monitor'
                            {...this.props.monitor}
                            execute={this.execute}
                            reset={this.reset}
                        />
                    )}
                </ViroARImageMarker>
            </ViroARScene>
        )
    }
}
