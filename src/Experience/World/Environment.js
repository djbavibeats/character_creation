import * as THREE from 'three'
import Experience from '../Experience.js'

import { Sky } from 'three/examples/jsm/objects/Sky.js'

let sky, sun
export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('sky')
        }

        this.setSunLight()
        this.setSky()
        this.setEnvironmentMap()
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(5, 5, 10.25)
        this.scene.add(this.sunLight)
    }

    setSky() {
        sky = new Sky()
        sky.scale.setScalar( 450000 )
        this.scene.add(sky)

        sun = new THREE.Vector3()

        const effectController = {
            turbidity: 20.0,
            rayleigh: 1,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.7,
            elevation: 1.25,
            azimuth: 105,
            exposure: .75
        }

        const uniforms = sky.material.uniforms;
        uniforms[ 'turbidity' ].value = effectController.turbidity
        uniforms[ 'rayleigh' ].value = effectController.rayleigh
        uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient
        uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG


        const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation )
        const theta = THREE.MathUtils.degToRad( effectController.azimuth )

        sun.setFromSphericalCoords( 1, phi, theta )

        uniforms[ 'sunPosition' ].value.copy( sun )
    }

    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.setEnvironmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.setEnvironmentMap.updateMaterial()
    }


}