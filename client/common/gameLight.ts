import HemisphericLight = BABYLON.HemisphericLight;
import Color3 = BABYLON.Color3;
import Vector3 = BABYLON.Vector3;
import PointLight = BABYLON.PointLight;
import {IRunnable} from "./iRunnable";
import GameCamera from "./gameCamera";
import DirectionalLight = BABYLON.DirectionalLight;
import Light = BABYLON.Light;

export default class GameLight implements IRunnable {

    hemi: HemisphericLight;
    sun: Light;
    scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;

        this.hemi = new HemisphericLight('hemi', new Vector3(0, 50, -100), scene);
        this.hemi.intensity = 1;
        this.hemi.diffuse = new Color3(1, 1, 1);
        this.hemi.specular = new Color3(0, 0, 0);
        this.hemi.groundColor = new Color3(0, 0, 0);

        this.sun = new PointLight('sun', new Vector3(0, 10, 10), scene);
    }

    run() {
    }
}