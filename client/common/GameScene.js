System.register([], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var GameScene;
    return {
        setters:[],
        execute: function() {
            Scene = BABYLON.Scene;
            Color3 = BABYLON.Color3;
            Mesh = BABYLON.Mesh;
            StandardMaterial = BABYLON.StandardMaterial;
            CubeTexture = BABYLON.CubeTexture;
            Texture = BABYLON.Texture;
            ActionManager = BABYLON.ActionManager;
            GameScene = (function (_super) {
                __extends(GameScene, _super);
                function GameScene(engine) {
                    _super.call(this, engine);
                    this.planets = new Array();
                    this.engine = engine;
                    this.actionManager = new ActionManager(this);
                    this.createSkybox();
                    this.createGrid();
                }
                GameScene.prototype.run = function () {
                    this.render();
                };
                GameScene.prototype.createGrid = function () {
                    //let gridColor = new Color3(111 / 255, 195 / 255, 223 / 255);
                    //let gridColor = new Color3(209 / 255, 196 / 255, 73 / 255);
                    var gridColor = new Color3(132 / 255, 189 / 255, 151 / 255);
                    var gridAlpha = 0.25;
                    for (var i = -800; i <= 800; i += 10) {
                        var xAxis = Mesh.CreateLines('lines', [
                            new BABYLON.Vector3(800, -2 / 3, i),
                            new BABYLON.Vector3(-800, -2 / 3, i)
                        ], this);
                        xAxis.color = gridColor;
                        xAxis.alpha = gridAlpha;
                        var yAxis = Mesh.CreateLines('lines', [
                            new BABYLON.Vector3(i, -2 / 3, -800),
                            new BABYLON.Vector3(i, -2 / 3, 800)
                        ], this);
                        yAxis.color = gridColor;
                        yAxis.alpha = gridAlpha;
                    }
                };
                GameScene.prototype.createSkybox = function () {
                    var skybox = new Mesh.CreateBox('skybox', 10000, this);
                    var skyboxMat = new StandardMaterial('skybox', this);
                    skyboxMat.backFaceCulling = false;
                    skyboxMat.diffuseColor = new Color3(0, 0, 0);
                    skyboxMat.specularColor = new Color3(0, 0, 0);
                    skyboxMat.reflectionTexture = new CubeTexture('/client/assets/skybox/sky03', this);
                    skyboxMat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
                    skybox.material = skyboxMat;
                    skybox.infiniteDistance = true;
                    skybox.renderingGroupId = 0;
                };
                return GameScene;
            })(Scene);
            exports_1("default", GameScene);
        }
    }
});
//# sourceMappingURL=GameScene.js.map