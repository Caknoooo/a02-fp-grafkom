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
    }

    setModel() {
        this.model = {};

        // Assuming 'couchModel' is the key for the model in your resources
        this.model.mesh = this.resources.items.couchModel.scene.children[0];
        this.scene.add(this.model.mesh);

        // Reuse the texture loading method from the Screen class
        // this.loadTexture('path/to/your/texture.jpg').then((texture) => {
        //     this.model.texture = texture;

        //     // Material
        //     this.model.mesh.material = new THREE.MeshBasicMaterial({
        //         map: this.model.texture
        //     });
        // });
    }

    // Texture loading method
    // loadTexture(sourcePath) {
    //     return new Promise((resolve) => {
    //         const element = document.createElement('img');
    //         element.src = sourcePath;
    //         element.onload = () => {
    //             const texture = new THREE.Texture(element);
    //             texture.encoding = THREE.sRGBEncoding;
    //             resolve(texture);
    //         };
    //     });
    // }
}
