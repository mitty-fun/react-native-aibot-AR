import React, { Component } from 'react';
import Template from '../../components/story';

const object = {
    source: require('../../res/models/story/060.vrx'),
    resources: [
        require('../../res/models/story/albert.png'),
        require('../../res/models/story/corn_flower.png'),
        require('../../res/models/story/grass.png'),
        require('../../res/models/story/land.png'),
        require('../../res/models/story/oil.png'),
        require('../../res/models/story/tire.png'),
        require('../../res/models/story/ufo.png'),
    ],
    scale: [0.03, 0.03, 0.03],
}

export default class Scene extends Component {
    render () {
        return (
            <Template
                object={object}
                target='060'
                voice={require('../../res/voice/060.mp3')}
            />
        )
    }
}

module.exports = Scene;