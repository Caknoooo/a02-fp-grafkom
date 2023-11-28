import * as THREE from 'three'
import Experience from './Experience.js'
import Baked from './Baked.js'
import BouncingLogo from './BouncingLogo.js'
import Screen from './Screen.js'

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
                // this.setBouncingLogo()
                this.setScreens()
            }
        })
    }

    setBaked()
    {
        this.baked = new Baked()
    }

    setBouncingLogo()
    {
        this.bouncingLogo = new BouncingLogo()
    }
q
    setScreens()
    {
        // this.pcScreen = new Screen(
        //     this.resources.items.pcScreenModel.scene.children[0],
        //     '/assets/videoPortfolio.mp4'
        // )
        // this.macScreen = new Screen(
        //     this.resources.items.macScreenModel.scene.children[0],
        //     '/assets/videoStream.mp4'
        // )
        this.backScreen = new Screen(
            this.resources.items.backScreenModel.scene.children[0],
            '/assets/video.mp4'
        )
    }

    resize()
    {
    }

    update()
    {
        // if(this.googleLeds)
        //     this.googleLeds.update()

        // if(this.loupedeckButtons)
        //     this.loupedeckButtons.update()

        // if(this.coffeeSteam)
        //     this.coffeeSteam.update()

        // if(this.topChair)
        //     this.topChair.update()

        // if(this.bouncingLogo)
        //     this.bouncingLogo.update()
    }

    destroy()
    {
    }
}