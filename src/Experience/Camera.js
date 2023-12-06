import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor(_options)
    {
        // Options
        this.experience = new Experience()
        this.config = this.experience.config
        this.cameraToggle = this.experience.cameraToggle
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.targetElement = this.experience.targetElement
        this.scene = this.experience.scene

        // Camera toggle
        if (this.cameraToggle) {
            this.debugFolder = this.cameraToggle.addFolder({
                title: 'Camera Toggle',
                expanded: true
            })
        }

        // Set up
        this.mode = 'default' // default \ debug

        this.setInstance()
        this.setModes()
    }

    setInstance() {
        // Set up
        this.instance = new THREE.PerspectiveCamera(10, this.config.width / this.config.height, 0.1, 2000)
        this.instance.rotation.reorder('YXZ')

        // Set up toggle
        if (this.cameraToggle) {
            this.debugFolder.addInput(
                this,
                'mode',
                {
                    options: {
                        default: 'default',
                        front_view: 'front_view',
                        podium_view: 'podium_view',
                    },
                }
            )
            .on('change', () => {
                this.changeMode(this.mode)
            })
        }

        this.scene.add(this.instance)
    }

    setModes()
    {
        this.modes = {}

        // Default
        this.modes.default = {}
        this.modes.default.instance = this.instance.clone()
        this.modes.default.instance.rotation.reorder('YXZ')

        // Front view
        this.modes.front_view = {}
        this.modes.front_view.instance = this.instance.clone()
        this.modes.front_view.instance.rotation.reorder('YXZ')
        this.modes.front_view.instance.position.set(-2.5, 0.5, 0.5)
        this.modes.front_view.instance.lookAt(0, 0, 0)
        this.modes.front_view.orbitControls = new OrbitControls(this.modes.front_view.instance, this.targetElement)
        this.modes.front_view.orbitControls.enabled = false
        this.modes.front_view.orbitControls.enableDamping = true
        this.modes.front_view.orbitControls.update()

        // Podium view
    }

    changeMode(_mode)
    {
        this.mode = _mode

        if (this.mode === 'front_view') {
            this.instance.setFocalLength(17)
        } else {
            this.instance.setFocalLength(101)
        }

        if (this.mode === 'front_view') {
            this.modes.front_view.orbitControls.enabled = true
            this.modes.podium_view.orbitControls.enabled = false

            this.modes.front_view.instance.position.set(-2.5, 0.5, 0.5)
            this.modes.front_view.instance.lookAt(0, 0, 0)
        }
    }

    resize()
    {
        this.instance.aspect = this.config.width / this.config.height
        this.instance.updateProjectionMatrix()

        this.modes.default.instance.aspect = this.config.width / this.config.height
        this.modes.default.instance.updateProjectionMatrix()

        this.modes.front_view.instance.aspect = this.config.width / this.config.height
        this.modes.front_view.instance.updateProjectionMatrix()
    }

    update()
    {
        this.modes.front_view.orbitControls.update()

        // Apply coordinates
        this.instance.position.copy(this.modes[this.mode].instance.position)
        this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
        this.instance.updateMatrixWorld() // To be used in projection
    }

    destroy()
    {
    }
}
