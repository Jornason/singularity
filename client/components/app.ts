import {Component} from 'angular2/core';
import {ViewEncapsulation} from "angular2/core";
import Engine = BABYLON.Engine;
import GameCamera from "../common/gameCamera";
import GameLight from "../common/gameLight";
import GameScene from "../common/GameScene";
import AssetsManager = BABYLON.AssetsManager;
import Galaxy from "../common/galaxy";

@Component({
    selector: 'app',
    template: '<canvas id="renderCanvas"></canvas>'
})
export class AppComponent {

    canvas: HTMLElement;
    engine: Engine;
    scene: GameScene;
    camera: GameCamera;
    light: GameLight;
    galaxy: Galaxy;

    constructor() {
        let self = this;
        this.canvas = document.getElementById('renderCanvas');
        this.engine = new Engine(this.canvas, true);
        this.scene = new GameScene(this.engine);
        this.camera = new GameCamera(this.canvas, this.scene);
        this.light = new GameLight(this.scene);
        this.galaxy = new Galaxy(this.scene, this.engine);

        this.engine.runRenderLoop(() => {
            this.camera.run();
            this.light.run();
            this.galaxy.run();
            this.scene.run();
        });

        window.addEventListener('resize', () => {
            self.engine.resize();
        });
    }
}
