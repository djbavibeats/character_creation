import * as THREE from 'three'
import Experience from '../Experience.js'

import { Sky } from 'three/examples/jsm/objects/Sky.js'
import { Water } from 'three/examples/jsm/objects/Water.js'

let sky, sun, water
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
        this.setWater()
        this.setWaterAnimation()
        this.setEnvironmentMap()

        this.time.on('tick', () => {
            this.setWaterAnimation()
        })
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunLight)
    }

    setSky() {
        sky = new Sky()
        sky.scale.setScalar( 450000 )
        this.scene.add(sky)

        sun = new THREE.Vector3()

        const effectController = {
            turbidity: 20.0,
            rayleigh: 3,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.7,
            elevation: -5,
            azimuth: 180,
            exposure: 1.75
        };



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

    setWater() {
        const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

				water = new Water(
					waterGeometry,
					{
						textureWidth: 512,
						textureHeight: 512,
						waterNormals: new THREE.TextureLoader().load( 'textures/water/waternormals.jpg', function ( texture ) {

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping

						} ),
						sunDirection: new THREE.Vector3(),
						sunColor: 0xffffff,
						waterColor: 0x001e0f,
						distortionScale: 3.7,
						fog: this.scene.fog !== undefined
					}
				)

                water.material.uniforms.size.value = 10
                water.material.uniforms.distortionScale = 8
                water.material.uniforms.elevation = 2

				water.rotation.x = - Math.PI / 2

				this.scene.add( water )

    }

    setWaterAnimation() {
        water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
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