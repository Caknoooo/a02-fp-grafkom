import * as THREE from "three";

import Experience from "./Experience.js";
import vertexShader from "./shaders/baked/vertex.glsl";
import fragmentShader from "./shaders/baked/fragment.glsl";

export default class CoffeeSteam {
  constructor(debugFolder) {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debugFolder = debugFolder;

    this.setModel();
    this.setLightingMix(0.14, 0);
  }

  setLightingMix(night, neutral) {
    this.model.material.uniforms.uNightMix.value = night;
    this.model.material.uniforms.uNeutralMix.value = neutral;
  }

  setModel() {
    this.model = {};

    this.model.mesh = this.resources.items.roomModel.scene.children[0];

    this.model.bakedDayTexture = this.resources.items.bakedDayTexture;
    this.model.bakedDayTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedDayTexture.flipY = false;

    this.model.bakedNightTexture = this.resources.items.bakedNightTexture;
    this.model.bakedNightTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedNightTexture.flipY = false;

    this.model.bakedNeutralTexture = this.resources.items.bakedNeutralTexture;
    this.model.bakedNeutralTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedNeutralTexture.flipY = false;

    this.model.lightMapTexture = this.resources.items.lightMapTexture;
    this.model.lightMapTexture.flipY = false;

    this.colors = {};
    this.colors.BackDrop = "#000000";

    this.model.material = new THREE.ShaderMaterial({
      uniforms: {
        uBakedDayTexture: { value: this.model.bakedDayTexture },
        uBakedNightTexture: { value: this.model.bakedNightTexture },
        uBakedNeutralTexture: { value: this.model.bakedNeutralTexture },
        uLightMapTexture: { value: this.model.lightMapTexture },

        uNightMix: { value: 0.14 },
        uNeutralMix: { value: 0 },

        uLightAreaColor: { value: new THREE.Color(this.colors.BackDrop) },
        uLightAreaStrength: { value: 0.2 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    this.model.mesh.traverse((_child) => {
      if (_child instanceof THREE.Mesh) {
        _child.material = this.model.material;
      }
    });

    this.scene.add(this.model.mesh);

    // Debug
    if (this.debugFolder) {
      this.debugFolder
          .addInput(
              this.colors,
              'BackDrop',
              { label: 'BackDrop Color', view: 'color' }
          )
          .on('change', () =>
          {
              this.model.material.uniforms.uLightAreaColor.value.set(this.colors.BackDrop)
          })

      this.debugFolder
          .addInput(
              this.model.material.uniforms.uLightAreaStrength,
              'value',
              { label: 'BackDrop Strength', min: 0, max: 0.8 }
          )
    }   
  }
}
