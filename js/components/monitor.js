import React, { Component } from 'react';
import { Alert } from 'react-native';
import { ViroNode, ViroBox, ViroSound, Viro3DObject, ViroAnimations } from 'react-viro';

export default class Monitor extends Component {

    constructor(props) {
        super(props);
        let defaultCommands = JSON.parse(JSON.stringify(props.defaultCommands));
        this.state = {
            stack: defaultCommands,
            index: 0,
            running: false,
            focusOn: undefined,
            commands: []
        }

        this.initOneCommandFromStack();
    }

    initOneCommandFromStack = () => {
        let arr = this.state.stack;
        if (arr.length <= 0) return;
        setTimeout(()=>{
            let cmd = this.initOneCommand(arr.shift());
            this.state.commands.push(cmd);
            this.setState({commands: this.state.commands});
            this.initOneCommandFromStack();
        }, 300);
    }

    // 將指令字串轉化成指令物件並賦予唯一key
    initOneCommand = (cmd) => {
        let symbol = cmd[0];
        let obj = { symbol, key: Math.random() };
        if (symbol === 'M') obj.type = 'stepForward';
        if (symbol === 'B') obj.type = 'stepBack';
        if (symbol === 'R') obj.type = 'turnRight';
        if (symbol === 'L') obj.type = 'turnLeft';
        if (symbol === '-') obj.type = 'pickUp';
        if (symbol === '+') obj.type = 'dropDown';
        if (symbol === 'J') {
            obj.type = 'jumpTo';
            obj.target = Number(cmd.slice(1));
        }
        if (symbol === '?') {
            obj.type = 'ifJumpTo';
            let params = cmd.slice(1).splice('J');
            obj.condition = params[0];
            obj.target = Number(params[1]);
        }
        return obj;
    }

    _runScript = () => {
        this.setState({ index: 0, running: true }, () => {
            this.props.reset();
            setTimeout(this._executeOneCommand, 100);
        });
    }

    _pause = () => {
        this.setState({ running: false });
    }

    _executeOneCommand = () => {
        let execute = this.props.execute;
        let cmd = this.state.commands[this.state.index];
        this.setState({ index: this.state.index + 1 });

        if (cmd === undefined) return this.setState({ running: false });
        if (!this.state.running) return;

        if (cmd.type === 'jumpTo') {
            this.setState({ index: cmd.target });
            setTimeout(this._executeOneCommand, 500);
        }
        else if (cmd.type === 'ifJumpTo') {
            if (execute('check', cmd.condition)) {
                this.setState({ index: cmd.target });
            }
            setTimeout(this._executeOneCommand, 500);
        }
        else {
            execute(cmd.type, this._executeOneCommand, this._execFail, this._execSuccess);
        }
    }

    _execFail = () => {
        Alert.alert('execFail');
    }

    _execSuccess = () => {
        Alert.alert('success!');
    }

    _focusOn = (index) => {
        if (this.state.focusOn === index) this._changeCommand(index);
        else this.setState({focusOn: index});
    }

    _changeCommand = (index) => {
        let commands = this.state.commands;
        let validCommands = this.props.validCommands;
        let symbol = commands[index].symbol;
        let next = (validCommands.indexOf(symbol) + 1) % validCommands.length;
        let cmd = this.initOneCommand(validCommands[next]);
        cmd.key = commands[index].key;
        commands[index] = cmd;
        this.setState({ commands });
    }


    _appendCommand = (index) => {
        let commands = this.state.commands;
        commands.splice(index, 0, this.initOneCommand(this.props.validCommands[0]));
        this.setState({ commands })
    }

    _removeCommand = () => {
        if (this.state.focusOn === undefined) return;
        let index = this.state.focusOn;
        let commands = this.state.commands;
        commands.splice(index, 1);
        this.setState({ commands, focusOn: undefined });
    }

    _renderCommand = (command, index) => {
        let x = index % 7;
        let z = (index - x) / 7;
        let active = this.state.index === index;
        let focusOn = this.state.focusOn === index || this.state.focusOn == undefined;
        return (
            <Command
                key={command.key}
                onClick={() => this._focusOn(index)}
                active={active}
                focusOn={focusOn}
                posX={x * 0.02} posZ={z * 0.028}
                symbol={command.symbol}
            />
        )
    }

    _renderAppendButton = () => {
        let index = this.state.commands.length;
        let x = index % 7;
        let z = (index - x) / 7;
        return (
            <Command
                posX={x * 0.02} posZ={z * 0.028}
                symbol='A' active={false}
                onClick={()=>this._appendCommand(this.state.commands.length)}/>
        )
    }


    render() {
        return (
            <ViroNode
                scale={this.props.scale}
                position={this.props.position}
                key={this.props.key}
            >
                {this.state.commands.map((cmd, idx) => this._renderCommand(cmd, idx))}
                {this._renderAppendButton()}
                {this.state.running ? (
                    <Command onClick={this._pause} symbol='S' posX={-0.02} posZ={0} active={false} focusOn={true}/>
                ) : (
                    <Command onClick={this._runScript} symbol='P' posX={-0.02} posZ={0} active={false} focusOn={true}/>
                )}
                <Command
                    posX={-0.02} posZ={0.028} 
                    symbol='A' active={false}
                    focusOn={true}
                    onClick={() => this._appendCommand(this.state.focusOn)}/>
                <Command
                    posX={-0.02} posZ={0.056}
                    symbol='D' active={false}
                    focusOn={true}
                    onClick={this._removeCommand} />
            </ViroNode>
        )
    }
}

class Command extends Component {
    constructor(props) {
        super(props);
        this.state = { pause: true };
    }
    onClick = () => {
        this.setState({ pause: false });
        this.props.onClick();
    }
    render() {
        let source = require('../res/models/commands/sign_minus.vrx');
        if (this.props.symbol === 'R') source = require('../res/models/commands/sign_turnright.vrx');
        if (this.props.symbol === 'L') source = require('../res/models/commands/sign_turnleft.vrx');
        if (this.props.symbol === 'M') source = require('../res/models/commands/sign_right.vrx');
        if (this.props.symbol === 'B') source = require('../res/models/commands/sign_left.vrx');
        if (this.props.symbol === '+') source = require('../res/models/commands/sign_plus.vrx');
        if (this.props.symbol === '-') source = require('../res/models/commands/sign_minus.vrx');
        if (this.props.symbol === '-') source = require('../res/models/commands/sign_minus.vrx');
        if (this.props.symbol === 'A') source = require('../res/models/commands/sign_add.vrx');
        if (this.props.symbol === 'D') source = require('../res/models/commands/sign_delete.vrx');
        if (this.props.symbol === 'P') source = require('../res/models/commands/sign_play.vrx');
        if (this.props.symbol === 'S') source = require('../res/models/commands/sign_stop.vrx');

        return (
            <ViroNode
                position={[this.props.posX, 0, this.props.posZ]}
                opacity={this.props.focusOn ? 1 : 0.5}
                scale={[0, 0, 0]}
                animation={{ name: 'obj_pop', run: true, delay: 1000 }}
                onClick={this.onClick}>
                <Viro3DObject
                    type='VRX'
                    scale={[0.014,0.014,0.014]}
                    source={require('../res/models/commands/sign_cube_normal.vrx')}
                    resources={[require('../res/models/commands/sign.png')]}
                    visible={!this.props.active}/>
                <Viro3DObject
                    type='VRX'
                    scale={[0.014,0.014,0.014]}
                    source={require('../res/models/commands/sign_cube_shine.vrx')}
                    resources={[require('../res/models/commands/sign2.png')]}
                    visible={this.props.active}/>
                {
                    this.props.color ? (
                        <ViroBox
                            scale={[0.014,0.014,0.014]}
                            position={[0, 0.005, 0]}
                            materials={[this.props.color]}/>
                    ) : (
                        <Viro3DObject
                            type='VRX'
                            scale={[0.014,0.014,0.014]}
                            source={source}
                            resources={[require('../res/models/commands/sign.png')]}/>
                    )
                }
                <ViroSound
                    paused={this.state.pause}
                    muted={false}
                    source={require('../res/sounds/click.mp3')}
                    volume={1.0}
                    onFinish={() => { this.setState({ pause: true })}}/>
            </ViroNode>
        )
    }
}
