import React, { Component } from 'react';
import {
    ViroImage,
    ViroNode,
    ViroAnimations,
} from 'react-viro';


export default class Dialogue extends Component {
    constructor (props) {
        super(props);
        this.state = {
            index: 0,
            key: 0,
            play: false,
            animation: 'hide',
        }
    }
    start = () => {
        this.setState({
            animation: 'pop',
            index: 0,
        })
    }
    stop = () => {
        this.setState({
            animation: 'hide',
        })
    }
    _next = () => {
        let index = this.state.index;
        index++;
        if (index >= this.props.sources.length) {
            this.setState({ animation: 'hide', })
        } else {
            this.setState({ index, key: index, play: false});
        }
    }
    _onLoadEnd = () => {
        this.setState({ play: true })
    }
    render () {
        return (
            <ViroNode
                position={this.props.position}
                onClick={this._next}
                transformBehaviors='billboardY'>
                <ViroImage
                    highAccuracyEvents={true}
                    key={this.state.key}
                    height={5.8}
                    width={9.3}
                    scale={[0, 0, 0]}
                    source={this.props.sources[this.state.index]}
                    animation={{ name: this.state.animation, run: this.state.play }}
                    onLoadEnd={this._onLoadEnd}/>
            </ViroNode>
        )
    }
}

ViroAnimations.registerAnimations({
    popup: {
        properties: {
            scaleX: 1.05,
            scaleY: 1.05,
            scaleZ: 1.05,
            positionY: 0.105,
        },
        duration: 400,
        easing: 'easeineaseout'
    },
    popdown: {
        properties: {
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            positionY: 0.1,
        },
        duration: 200,
        easing: 'easeineaseout'
    },
    hide: {
        properties: {
            scaleX: 0,
            scaleY: 0,
            scaleZ: 0,
            positionY: 0,
        },
        duration: 200,
        easing: 'easeineaseout'
    },
    pop: [['popup', 'popdown']]
});