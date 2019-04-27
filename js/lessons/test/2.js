import React, { Component } from 'react';
import {
    ViroARScene,
    ViroARImageMarker,
    ViroImage,
    ViroNode,
} from 'react-viro';

import Dialogue from '../../components/dialogue';


export default class Scene extends Component {
    constructor (props) {
        super(props);
        this.state = { bool: false }
    }
    render () {
        return (
            <ViroARScene>
                <ViroARImageMarker target={'060'}>
                    <Dialogue
                        sources={[
                            require('../../res/hint/albert_hint.png'),
                            require('../../res/hint/albert_hint2.png'),
                            require('../../res/hint/albert_hint3.png'),
                        ]}
                    />
                </ViroARImageMarker>
            </ViroARScene>
        )
    }
}

module.exports = Scene;