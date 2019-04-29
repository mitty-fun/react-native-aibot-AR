import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
    ViroNode,
    ViroBox,
    Viro3DObject,
    ViroSpotLight,
    ViroAmbientLight,
    ViroAnimations,
} from 'react-viro';

import AIbot from './aibot';

export default class Playground extends Component {
    constructor (props) {
        super(props);
        this.state = { first: true, key: Math.random() }
    }

    execute = (...params) => {
        this.refs.grid.execute(...params);
    }

    reset = () => {
        if (this.state.first) return this.setState({ first: false });    
        this.setState({ key: Math.random() });
    }

    render() {
        return (
            <ViroNode key={this.state.key}>
                <Grid
                    onLoadEnd={this.props.onLoadEnd}
                    {...this.props} 
                    ref='grid'
                />
            </ViroNode>
        )
    }
}

class Grid extends Component {
    constructor(props) {
        super(props);
        let grid = Array(props.col).fill('').map(()=>[]);

        this.state = {
            player: JSON.parse(JSON.stringify(this.props.player)),
            grid: grid,
            backpack: [],
            stack: JSON.parse(JSON.stringify(this.props.objects)),
            firstLoaded: false,
        }
        this.state.player.key = Math.random();
    }

    _initOneObject = () => {
        let arr = this.state.stack;
        if (arr.length <= 0) {
            if (this.state.firstLoaded == false) {
                this.setState({firstLoaded: true});
                this.props.onLoadEnd();
            }
            return;
        }
        let grid = this.state.grid;
        let obj = arr.shift();
        grid[obj.posX][obj.posZ] = obj;
        grid[obj.posX][obj.posZ].key = Math.random();
        this.setState({grid: this.state.grid});
        if (obj.source == undefined) {
            this._initOneObject();
        }
    }

    execute = (command, execDone, execFail, execSuccess) => {
        let wrapper = () => this._checker(execDone, execSuccess);
        if (command === 'stepForward') return this._move(1, wrapper);
        if (command === 'stepBack') return this._move(-1, wrapper);
        if (command === 'turnRight') return this._turn(90, wrapper);
        if (command === 'turnLeft') return this._turn(-90, wrapper);
        if (command === 'pickUp') return this._pickUp(wrapper);
        if (command === 'dropDown') return this._dropDown(wrapper);
        if (command === 'check') return this._check(wrapper);
    }

    reset = () => {
        this.setState({ key: Math.random() });
    }

    _checker = (execDone, execSuccess) => {
        return this.props.checker(this.state) ? execSuccess() : execDone();
    }

    _move = (step, execDone) => {
        let player = this.state.player;
        if (player.rotY === 0) {
            player.posZ -= step;
            name = 'moveUp';
        }
        else if (player.rotY === 180) {
            player.posZ += step;
            name = 'moveDown';
        }
        else if (player.rotY === 90) {
            player.posX += step;
            name = 'moveRight';
        }
        else if (player.rotY === 270) {
            player.posX -= step;
            name = 'moveLeft';
        }
        if (player.posX < 0 || player.posX >= this.props.col ||
            player.poxZ < 0 || player.posZ >= this.props.row) {
            return this._showError('out of range!');
        }
        let target = this.state.grid[player.posX][player.posZ];
        if (target && target.type === 'stop') {
            return this._showError(target.msg || 'stop!');
        }
        this.setState({ player });
        this.refs.player.playAnimation(name, execDone);
    }

    _turn = (deg, execDone) => {
        let player = this.state.player;
        player.rotY += deg;
        player.rotY %= 360;
        if (player.rotY < 0) player.rotY += 360;
        this.setState({ player });
        this.refs.player.playAnimation(deg > 0 ? 'turnRight' : 'turnLeft', execDone);
    }

    _pickUp = (execDone) => {
        let { player, grid, backpack } = this.state;
        let target = grid[player.posX][player.posZ];

        if (!target) return this._showError('it\'s empty now!');
        if (!target.count) return this._showError('Error');

        let obj = JSON.parse(JSON.stringify(target));
        obj.count = 1;
        backpack.push(obj);
        if (target.count >= 2) target.count--;
        else grid[player.posX][player.posZ] = undefined;
        this.setState({ grid, backpack });

        setTimeout(execDone, 500);
    }

    _dropDown(execDone) {
        let { player, grid, backpack } = this.state;
        let target = grid[player.posX][player.posZ];

        if (backpack.length <= 0) return this._showError('backpack is empty!');

        let obj = backpack.pop();
        if (target && target.name != obj.name) return this._showError('different type!');
        if (target === undefined) grid[player.posX][player.posZ] = obj;
        else target.count++;
        this.setState({ grid, backpack });

        setTimeout(execDone, 500);
    }

    _check(execDone, condition) {
        let { player, grid } = this.state;
        let target = grid[player.posX][player.posZ];
        return target && target.name === condition;
    }

    _showError(msg) {
        Alert.alert(msg);
    }

    render() {
        let objects = [];
        for (let x=0; x<this.props.col; x++) {
            for (let z=0; z<this.props.row; z++) {
                let obj = this.state.grid[x][z];
                if (obj) {
                    objects.push(
                        obj.source ? (
                            <Viro3DObject
                                type="VRX"
                                key={obj.key}
                                position={[x, 0, z]}
                                rotation={[0, obj.rotY, 0]}
                                source={obj.source}
                                onLoadEnd={this._initOneObject}
                                scale={[0, 0, 0]}
                                animation={{ name: 'obj_pop', run: true, delay: 1000 }}
                                resources={obj.resources}/>
                        ) : (
                            <ViroBox 
                                key={obj.key}
                                position={[x, 0, z]}
                                rotation={[0, obj.rotY, 0]}
                                materials={[obj.color]}/>   
                        )
                    )
                }
            }
        }

        return (
            <ViroNode 
                scale={this.props.scale}
                position={this.props.position}>
                <ViroSpotLight
                        innerAngle={5}
                        outerAngle={25}
                        direction={[0, -3, 0]}
                        position={[0, 100, 0]}
                        color="#ffffff"
                        shadowMapSize={2048}
                        shadowNearZ={2}
                        shadowFarZ={5}
                        shadowOpacity={.7} />
                <ViroAmbientLight color="#777777" />
                <AIbot
                    ref="player"
                    onLoadEnd={this._initOneObject}
                    {...this.state.player}/>
                {objects}
            </ViroNode>
        )
    }
}

ViroAnimations.registerAnimations({
    obj_popup: {
        properties: {
            scaleX: 1.5,
            scaleY: 1.5,
            scaleZ: 1.5,
        },
        duration: 300,
        easing: 'easeineaseout'
    },
    obj_popdown: {
        properties: {
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
        },
        duration: 200,
        easing: 'easeineaseout'
    },
    obj_pop: [['obj_popup', 'obj_popdown']]
});
