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
        this.hexadecimalColor = '000000'
        this.material = new THREE.MeshStandardMaterial({ color: '#ff0000' })
        // this.material.side = THREE.DoubleSide
        
        this.glassesResource = this.resources.items.glassesModel

        this.eyewearActive = 'false'

        document.getElementById('color_picker').addEventListener('input', (e) => {
            this.hexadecimalColor = parseInt("0x" + e.target.value.toString().substring(1))
            this.material.color.set(this.hexadecimalColor)
            this.setMaterial()
        })

        document.getElementById('eyewear_button').addEventListener('click', (e) => {
            if (this.eyewearActive === 'true') {
                this.unsetEyewear()
                this.eyewearActive = 'false'
            } else {
                this.setEyewear()
                this.eyewearActive = 'true'
            }
        })
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(50, 50, 50)
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

    setEyewear() {
        this.glassesModel = this.glassesResource.scene
        this.glassesModel.scale.set(52, 50, 54)
        this.glassesModel.position.set(-0.15, 1.6, 4.33)
        this.glassesModel.rotation.set(0, 0, -0.038)
        this.group.add(this.glassesModel)
    }

    unsetEyewear() {
        this.group.remove(this.glassesModel)
    }


}