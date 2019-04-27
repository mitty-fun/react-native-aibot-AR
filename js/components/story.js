import React, { Component } from 'react';
import {
    ViroARScene,
    ViroARImageMarker,
    ViroSound,
    Viro3DObject,
    ViroSpotLight,
    ViroAmbientLight,
    ViroMaterials,
} from 'react-viro';

export default class Screne extends Component {
    constructor (props) {
        super(props);
        this.state = {
            objectLoaded: false,
            anchorFound: false,
        }
    }
    _onAnchorFound = () => {
        this.setState({ anchorFound: true });
    }

    _onLoadEnd = () => {
        this.setState({ objectLoaded: true });
    }

    _onClick = () => {
        this.setState({ anchorFound: !this.state.anchorFound });
    }

    render() {
        return (
            <ViroARScene>
                <ViroARImageMarker target={this.props.target} onAnchorFound={this._onAnchorFound}>
                    <ViroSpotLight
                        innerAngle={5}
                        outerAngle={25}
                        direction={[0, -1, 0]}
                        position={[0, 5, 0]}
                        color="#ffffff"
                        castsShadow={true}
                        shadowMapSize={2048}
                        shadowNearZ={2}
                        shadowFarZ={5}
                        shadowOpacity={.7} />
                    <ViroAmbientLight color="#777777" />
                    <Viro3DObject
                        {...this.props.object}
                        type="VRX"
                        onLoadEnd={this._onLoadEnd}
                        onClick={this._onClick}
                        animation={{
                            name:'Take 001',
                            loop: true,
                            run: this.state.objectLoaded && this.state.anchorFound,
                        }}
                    />
                    {this.props.voice && 
                        <ViroSound source={this.props.voice} paused={!(this.state.objectLoaded && this.state.anchorFound)}/>
                    }
                    {this.props.bgm && 
                        <ViroSound source={this.props.bgm} paused={false}/>
                    }
                </ViroARImageMarker>
            </ViroARScene>
        )
    }
}

ViroMaterials.createMaterials({
    white: { diffuseColor: '#ffffff77' },
});
