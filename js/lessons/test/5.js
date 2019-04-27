import React, { Component } from 'react';
import {
    ViroARScene,
    ViroARImageMarker,
    ViroSpotLight,
    ViroAmbientLight,
    Viro3DObject,
} from 'react-viro'


export default class Scene extends Component {
    render () {
        return (
            <ViroARScene>
                <ViroARImageMarker target={'060'}>
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
                    <ViroAmbientLight color="#777777"/>
                    <Viro3DObject
                        type="VRX"
                        source={require('../../res/models/flower/corn_flower.vrx')}
                        resources={[require('../../res/models/flower/corn_flower.png')]}
                        scale={[0.03, 0.03, 0.03]}
                        position={[0.05, 0, 0]}
                    />
                    <Viro3DObject
                        type="VRX"
                        source={require('../../res/models/commands/sign_cube_shine.vrx')}
                        resources={[require('../../res/models/commands/sign2.png')]}
                        scale={[0.03, 0.03, 0.03]}
                        position={[0, 0, 0]}
                    />
                    <Viro3DObject
                        type="VRX"
                        source={require('../../res/models/albert/albertwalk.vrx')}
                        resources={[require('../../res/models/albert/albert.png')]}
                        scale={[0.03, 0.03, 0.03]}
                        position={[-0.05, 0, 0]}
                    />
                </ViroARImageMarker>
            </ViroARScene>
        )
    }
}

module.exports = Scene;