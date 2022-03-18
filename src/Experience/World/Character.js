import * as THREE from 'three'
import Experience from '../Experience'

export default class Character {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Group
        this.group = this.experience.group

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('character')
        }

        // Setup

        this.resource = this.resources.items.characterModel
        this.setModel()

        // Material
        this.material = new THREE.MeshStandardMaterial()
        this.hexadecimalColor = '0xd71bda'
        this.material.side = THREE.DoubleSide
        this.setMaterial()

        document.getElementById('color_picker').addEventListener('input', (e) => {
            this.hexadecimalColor = parseInt("0x" + e.target.value.toString().substring(1))
            this.material.color.set(this.hexadecimalColor)
            this.setMaterial()
        })
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(25, 25, 25)
        this.model.position.y = .5
        this.group.add(this.model)
    }

    setMaterial() {
        this.model.traverse((o) => {
            if (o instanceof THREE.Mesh) {
                o.material = this.material
            }
        })
    }
}