import * as THREE from 'three';
import Experience from './Experience.js';

export default class Couch {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;
        this.scene = this.experience.scene;
        this.world = this.experience.world;

        this.setModel();
        this.setPosition(-3.7, 0.11, 0);
        this.scale(0.05);
        this.rotate(-90, 0, 0);
        this.addLighting(); // Add this line
    }

    setModel() {
        this.model = {};

        // Assuming 'couchModel' is the key for the model in your resources
        this.model.mesh = this.resources.items.couchModel.scene.children[0];
        this.scene.add(this.model.mesh);
    }

    setPosition(x, y, z) {
        this.model.mesh.position.set(x, y, z);
    }

    scale(s) {
        this.model.mesh.scale.set(s, s, s);
    }

    rotate(x, y, z) {
        const x_radian = THREE.MathUtils.degToRad(x);
        const y_radian = THREE.MathUtils.degToRad(y);
        const z_radian = THREE.MathUtils.degToRad(z);
        this.model.mesh.rotation.set(x_radian, y_radian, z_radian);
    }

    // (todo) refactor lighting for base and each model
    addLighting() {
        const light = new THREE.PointLight(0xffffff, 0.8, 20);
        light.position.set(0, 2, 0);
        this.scene.add(light);
    }
}
