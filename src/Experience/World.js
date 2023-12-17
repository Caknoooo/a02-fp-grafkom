import * as THREE from 'three'
import Experience from './Experience.js'
import Baked from './Baked.js'
import Screen from './Screen.js'
import Chair from './Chair.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setBaked()
                this.setScreens()
                this.setChairs()
            }
        })
    }

    setBaked()
    {
        this.baked = new Baked()
    }

    setScreens()
    {
        this.backScreen = new Screen(
            this.resources.items.backScreenModel.scene.children[0],
            '/assets/video.mp4'
        )
    }

    setChairs()
    {
        this.chair = new Chair()
    }

    resize()
    {
    }

    update()
    {
    }

    destroy()
    {
    }
}