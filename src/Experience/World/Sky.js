import * as THREE from 'three'
import Experience from '../Experience'

export default class Sky {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('sky')
        }

        this.setSky()
    }

    setSky() {
      
    }
}