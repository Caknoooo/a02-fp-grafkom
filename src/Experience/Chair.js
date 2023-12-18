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

    this.row = 4;
    this.column = 5;

    if (this.debugFolder) {
      this.debugFolder
        .addInput(this, "row", { label: "Chairs Row", min: 0, max: 4, step: 1 })
        .on("change", () => {
          this.setModel();
        });
      this.debugFolder
        .addInput(this, "column", { label: "Chairs Column", min: 0, max: 5, step: 1 })
        .on("change", () => {
          this.setModel();
        });
    }
    this.chaircount = []
    this.setModel();
    this.setLightingMix(0.14, 0);
  }

  setLightingMix(night, neutral) {
    this.model.material.uniforms.uNightMix.value = night;
    this.model.material.uniforms.uNeutralMix.value = neutral;
  }

  setModel() {
    this.model = {};
    //Remove a chair
    this.chaircount.forEach((chair) => {
      this.scene.remove(chair);
    });
    this.chaircount = [];

    this.model.mesh = this.resources.items.chairModel.scene.children[0];

    this.model.bakedDayTexture = this.resources.items.chairDay;
    this.model.bakedDayTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedDayTexture.flipY = false;

    this.model.bakedNightTexture = this.resources.items.chairNight;
    this.model.bakedNightTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedNightTexture.flipY = false;

    this.model.bakedNeutralTexture = this.resources.items.chairNeutral;
    this.model.bakedNeutralTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedNeutralTexture.flipY = false;

    this.model.lightMapTexture = this.resources.items.chairDay;
    this.model.lightMapTexture.flipY = false;

    this.model.material = new THREE.ShaderMaterial({
      uniforms: {
        uBakedDayTexture: { value: this.model.bakedDayTexture },
        uBakedNightTexture: { value: this.model.bakedNightTexture },
        uBakedNeutralTexture: { value: this.model.bakedNeutralTexture },
        uLightMapTexture: { value: this.model.lightMapTexture },

        uNightMix: { value: 0.14 },
        uNeutralMix: { value: 0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    this.model.mesh.traverse((_child) => {
      if (_child instanceof THREE.Mesh) {
        _child.material = this.model.material;
      }
    });

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let x = 0.5;
        let z = 0.4;
        let chair = this.model.mesh.clone();
        chair.position.x += j * x;
        chair.position.z += i * z;
        this.scene.add(chair);
        this.chaircount.push(chair);
      }
    }
  }
}
