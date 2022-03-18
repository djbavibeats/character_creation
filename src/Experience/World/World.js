import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Character from './Character.js'

export default class World {
    constructor() {
        this.experience = new Experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.character = new Character()
            this.environment = new Environment()
        })
    }

   
}