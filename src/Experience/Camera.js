import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from './Experience.js'

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('camera')
        }

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0, 4, 25)

        this.scene.add(this.instance)

        if (this.debug.active) {
            this.debugFolder.add( this.instance.position, 'x').min(-100).max(100).step(0.01).name('position x')
            this.debugFolder.add( this.instance.position, 'y').min(-100).max(100).step(0.01).name('position y')
            this.debugFolder.add( this.instance.position, 'z').min(-100).max(100).step(0.01).name('position z')
        }
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enableZoom = false
        this.controls.enablePan = false
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}