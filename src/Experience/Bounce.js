import * as THREE from 'three'

import Experience from './Experience.js'

export default class Bounce
{
    constructor(debugFolder)
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.time = this.experience.time
        this.debugFolder = debugFolder

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = {}

        this.model.group = new THREE.Group()
        this.model.group.position.x = -4.09
        this.model.group.position.y = 0.49
        this.model.group.position.z = 0 
        this.model.group.rotation.y = Math.PI 
        this.scene.add(this.model.group)

        this.model.texture = this.resources.items.screenOff
        this.model.texture.encoding = THREE.sRGBEncoding

        this.model.geometry = new THREE.PlaneGeometry(4, 1, 1, 1)
        this.model.geometry.rotateY(- Math.PI * 0.5)

        this.model.material = new THREE.MeshBasicMaterial({
            transparent: true,
            premultipliedAlpha: true,
            map: this.model.texture
        })

        this.model.mesh = new THREE.Mesh(this.model.geometry, this.model.material)
        this.model.mesh.scale.y = 0.04
        this.model.mesh.scale.z = 0.04
        this.model.group.add(this.model.mesh)
    }

    setAnimation()
    {
        this.animations = {}

        this.animations.z = 0
        this.animations.y = 0

        this.animations.limits = {}
        this.animations.limits.z = { min: -0.265, max: 0.270 }
        this.animations.limits.y = { min: -0.160, max: 0.150 }

        this.animations.speed = {}
        this.animations.speed.z = 0.00030
        this.animations.speed.y = 0.00030

        if(this.debugFolder)
        {
            // speed controller 
            const speedController = {
                speed: 0.00030
            }

            this.debugFolder.addInput(
                speedController,
                'speed',
                { label: 'Bouncing Speed', min: 0.1, max: 20, step: 0.01 }
            ).on('change', () =>
            {
                this.animations.speed.z = speedController.speed/10000
                this.animations.speed.y = speedController.speed/10000
            })
        }
    }

    update()
    {
        this.animations.z += this.animations.speed.z * this.time.delta
        this.animations.y += this.animations.speed.y * this.time.delta

        if(this.animations.z > this.animations.limits.z.max)
        {
            this.animations.z = this.animations.limits.z.max
            this.animations.speed.z *= -1
        }
        if(this.animations.z < this.animations.limits.z.min)
        {
            this.animations.z = this.animations.limits.z.min
            this.animations.speed.z *= -1
        }
        if(this.animations.y > this.animations.limits.y.max)
        {
            this.animations.y = this.animations.limits.y.max
            this.animations.speed.y *= -1
        }
        if(this.animations.y < this.animations.limits.y.min)
        {
            this.animations.y = this.animations.limits.y.min
            this.animations.speed.y *= -1
        }

        this.model.mesh.position.z = this.animations.z
        this.model.mesh.position.y = this.animations.y
    }
}