import Engine = BABYLON.Engine;
import Scene = BABYLON.Scene;
import Color3 = BABYLON.Color3;
import Mesh = BABYLON.Mesh;
import Vector3 = BABYLON.Vector3;
import StandardMaterial = BABYLON.StandardMaterial;
import CubeTexture = BABYLON.CubeTexture;
import Texture = BABYLON.Texture;
import {IRunnable} from './iRunnable';
import SpiralGalaxy from "./spiralGalaxy";
import FresnelParameters = BABYLON.FresnelParameters;
import VolumetricLightScatteringPostProcess = BABYLON.VolumetricLightScatteringPostProcess;
import ActionManager = BABYLON.ActionManager;

export default class GameScene extends Scene, IRunnable {

    engine: Engine;

    constructor(engine: Engine) {
        super(engine);
        this.planets = new Array();
        this.engine = engine;

        this.actionManager = new ActionManager(this);

        this.createSkybox();
        this.createGrid();
    }

    run() {
        this.render();
    }

    createGrid() {
        //let gridColor = new Color3(111 / 255, 195 / 255, 223 / 255);
        //let gridColor = new Color3(209 / 255, 196 / 255, 73 / 255);
        let gridColor = new Color3(132 / 255, 189 / 255, 151 / 255);
        let gridAlpha = 0.25;

        for (let i = -800; i <= 800; i += 10) {

            let xAxis = Mesh.CreateLines('lines', [
                new BABYLON.Vector3(800, -2/3, i),
                new BABYLON.Vector3(-800, -2/3, i)
            ], this);
            xAxis.color = gridColor;
            xAxis.alpha = gridAlpha;

            let yAxis = Mesh.CreateLines('lines', [
                new BABYLON.Vector3(i, -2/3, -800),
                new BABYLON.Vector3(i, -2/3, 800)
            ], this);
            yAxis.color = gridColor;
            yAxis.alpha = gridAlpha;
        }
    }

    createSkybox() {
        let skybox = new Mesh.CreateBox('skybox', 10000, this);
        let skyboxMat = new StandardMaterial('skybox', this);
        skyboxMat.backFaceCulling = false;
        skyboxMat.diffuseColor = new Color3(0, 0, 0);
        skyboxMat.specularColor = new Color3(0, 0, 0);
        skyboxMat.reflectionTexture = new CubeTexture('/client/assets/skybox/sky03', this);
        skyboxMat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skybox.material = skyboxMat;
        skybox.infiniteDistance = true;
        skybox.renderingGroupId = 0;
    }
}