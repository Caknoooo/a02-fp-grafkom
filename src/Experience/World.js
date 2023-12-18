import * as THREE from 'three'
import Experience from './Experience.js'
import Baked from './Baked.js'
import Screen from './Screen.js'
import Chair from './Chair.js'
import Back from './Back.js'
import Bounce from './Bounce.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.resources = this.experience.resources
        
        if(this.debug){
            this.debugFolder = this.debug.addFolder({
                title: 'User Controls',
                expanded: false
            })
        }

        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setBaked(this.debugFolder)
                this.setBack(this.debugFolder)
                this.setScreens(this.debugFolder)
                this.setBounce(this.debugFolder)
                this.setChairs(this.debugFolder)
                this.setupLightingControls();
            }
        })
    }

    setupLightingControls() {
        const night = {
          value: 0.5,
        };
        const neutral = {
            value: 0,
        };
    
        this.debugFolder.addInput(
          night,
          'value',
          { label: 'Night', min: 0, max: 1, step: 0.01 }
        ).on('change', () => {
          this.setLightingMix(night.value, neutral.value);
        });

        this.debugFolder.addInput(
          neutral,
          'value',
          { label: 'Neutral', min: 0, max: 1, step: 0.01 }
        ).on('change', () => {
          this.setLightingMix(night.value, neutral.value);
        });
      }
    
      setLightingMix(night, neutral) {
        if (this.baked) {
          this.baked.setLightingMix(night, neutral);
        }
        if (this.chair) {
          this.chair.setLightingMix(night, neutral);
        }
        if (this.back) {
          this.back.setLightingMix(night, neutral);
        }
      }
    setBaked(debugFolder)
    {
        this.baked = new Baked(debugFolder)
    }

    setScreens(debugFolder)
    {
        this.backScreen = new Screen(
            this.resources.items.backScreenModel.scene.children[0],
            '/assets/video.mp4',
            debugFolder
        )
    }

    setChairs(debugFolder)
    {
        this.chair = new Chair(debugFolder)
    }

  
    setBack(debugFolder) {
      this.back = new Back(debugFolder);
    }

    setBounce(debugFolder) {
        this.bounce = new Bounce(debugFolder);
    }
  
    resize()
    {
    }

    update()
    {
        if (this.bounce) {
          this.bounce.update();
        }
    }

    destroy()
    {
    }
}