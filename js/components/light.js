import React, { Component } from 'react';
import {
    ViroNode,
    ViroSpotLight,
    ViroAmbientLight,
} from 'react-viro';

export default class Screne extends Component {
    render () {
        return (
            <ViroNode>
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
            </ViroNode>
        )
    }
}