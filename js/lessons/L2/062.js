import React, { Component } from 'react';
import Template from '../../components/game';

const monitor = {
    position: [0.155, 0, -0.036],
    scale: [1.1, 1.1, 1],
    validCommands: ['M', 'B', 'R', 'L', '+', '-'],
    defaultCommands: [
        'M', 'M', '-', 'R', 'M', 'M', '-', 'L', 'M', 'M', '-', 'L',
        'M', 'M', '-', 'R', 'M', 'M', '-', 'L', 'M', 'M', '-', 'L',
        'M', 'M', '-', 'R', 'M', 'M', '-', 'L', 'M', 'M', '-', 'L',
        'M', 'M', '-', 'R', 'M', 'M',
    ],
}

const playground = {
    col: 7,
    row: 7,
    position: [-0.0685, 0, -0.102],
    scale: [2.271/100, 2.271/100, 2.271/100],
    player: {
        posX: 0, 
        posZ: 4,
        rotY: 90,
        source: require('../../res/models/albert/albert_walk.vrx'),
        resources: [require('../../res/models/albert/albert.png')],
    },
    objects: [
        {
            posX: 2, 
            posZ: 0,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 4, 
            posZ: 0,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 0, 
            posZ: 2,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 2, 
            posZ: 2,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 4, 
            posZ: 2,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 6, 
            posZ: 2,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 2, 
            posZ: 4,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 4, 
            posZ: 4,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 6, 
            posZ: 4,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 2, 
            posZ: 6,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 4, 
            posZ: 6,
            rotY: 0,
            type: 'item',
            name: 'flower',
            count: 1,
            source: require('../../res/models/flower/corn_flower_new.vrx'),
            resources: [require('../../res/models/flower/corn_flower.png')],
        },
        {
            posX: 0, 
            posZ: 0,
            rotY: 0,
            type: 'stop',
            name: 'hole',
            color: 'black',
            mes: '掉入黑洞了！',
        },
        {
            posX: 6, 
            posZ: 0,
            rotY: 0,
            type: 'stop',
            name: 'hole',
            color: 'black',
            mes: '掉入黑洞了！',
        },
        {
            posX: 0, 
            posZ: 6,
            rotY: 0,
            type: 'stop',
            name: 'hole',
            color: 'black',
            mes: '掉入黑洞了！',
        },
        {
            posX: 6, 
            posZ: 6,
            rotY: 0,
            type: 'stop',
            name: 'hole',
            color: 'black',
            mes: '掉入黑洞了！',
        },
        {
            posX: 3, 
            posZ: 2,
            rotY: 0,
            type: 'stop',
            name: 'hole',
            color: 'black',
            mes: '掉入黑洞了！',
        },
        {
            posX: 3, 
            posZ: 4,
            rotY: 0,
            type: 'stop',
            name: 'hole',
            color: 'black',
            mes: '掉入黑洞了！',
        },
    ],
    bgm: require('../../res/sounds/bgm_1.mp3'),
    checker: (playground) => {
        return playground.backpack.length === 11;
    }
}

export default class Scene extends Component {
    render () {
        return (
            <Template
                target='062'
                bgm={require('../../res/sounds/bgm_1.mp3')}
                monitor={monitor}
                playground={playground}
            />
        )
    }
}

module.exports = Scene;