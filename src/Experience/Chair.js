import * as THREE from 'three';
import Experience from './Experience.js';

export default class Chair {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;
        this.scene = this.experience.scene;
        this.world = this.experience.world;

        this.setModel();
        this.setPosition(-2, 0, 0.5);
        this.scale(0.2);
        this.rotate(-90, 0, 135);
        this.addLighting(); // Add this line
    }

    setModel() {
        this.model = {};

        // Assuming 'couchModel' is the key for the model in your resources
        this.model.mesh = this.resources.items.chairModel.scene.children[0];
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
        const light = new THREE.PointLight(0xffffff, 0.9, 0);
        light.position.set(0, 1.5, 0);
        this.scene.add(light);
    }
}
