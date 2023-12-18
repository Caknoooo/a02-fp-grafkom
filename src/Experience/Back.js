import * as THREE from "three";

import Experience from "./Experience.js";
import vertexShader from "./shaders/baked/vertex.glsl";
import fragmentShader from "./shaders/baked/fragment.glsl";

export default class CoffeeSteam {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    window.addEventListener('keydown', this.onKeyDown.bind(this), false);

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "Back Controls",
        expanded: false,
      });
    }

    this.setModel();
    this.model.mesh.visible = false;
  }

  onKeyDown(event) {
        switch (event.key) {
            case 'p':
                this.model.mesh.visible = false;
                break;
            case 'f':
                this.model.mesh.visible = true;
                break;
            case 'd':
                this.model.mesh.visible = false;
                break;
        }
    }

  setModel() {
    this.model = {};

    this.model.mesh = this.resources.items.backModel.scene.children[0];

    this.model.bakedDayTexture = this.resources.items.backTexture;
    this.model.bakedDayTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedDayTexture.flipY = false;

    this.model.bakedNightTexture = this.resources.items.backTexture;
    this.model.bakedNightTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedNightTexture.flipY = false;

    this.model.bakedNeutralTexture = this.resources.items.backTexture;
    this.model.bakedNeutralTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedNeutralTexture.flipY = false;

    this.model.lightMapTexture = this.resources.items.backTexture;
    this.model.lightMapTexture.flipY = false;

    this.colors = {};
    this.colors.BackDrop = "#FF000A";

    this.model.material = new THREE.ShaderMaterial({
      uniforms: {
        uBakedDayTexture: { value: this.model.bakedDayTexture },
        uBakedNightTexture: { value: this.model.bakedNightTexture },
        uBakedNeutralTexture: { value: this.model.bakedNeutralTexture },
        uLightMapTexture: { value: this.model.lightMapTexture },
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
    // visible controls
    if (this.debug) {
      this.debugFolder.addInput(this.model.mesh, "visible", { label: "visible" });
    }

  }
}
