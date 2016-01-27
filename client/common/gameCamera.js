System.register([], function(exports_1) {
    var GameCamera;
    return {
        setters:[],
        execute: function() {
            ArcRotatePanCamera = BABYLON.ArcRotatePanCamera;
            Vector3 = BABYLON.Vector3;
            GameCamera = (function () {
                function GameCamera(canvas, scene) {
                    this.canvas = canvas;
                    this.camera = new ArcRotatePanCamera('gameCamera', 0, 0, 0, new Vector3(0, 0, 0), scene);
                    this.camera.setPosition(new Vector3(5, 5, -10));
                    this.camera.radius = 50;
                    this.camera.keysUp.push(87); // W
                    this.camera.keysLeft.push(65); // A
                    this.camera.keysDown.push(83); // S
                    this.camera.keysRight.push(68); // D
                    this.camera.lowerBetaLimit = 0.1;
                    this.camera.upperBetaLimit = (Math.PI / 2) * 0.99;
                    this.camera.lowerRadiusLimit = 15;
                    this.camera.upperRadiusLimit = 400;
                    this.camera.attachControl(this.canvas, true);
                }
                GameCamera.prototype.run = function () {
                    if (this.target) {
                        if (Vector3.Distance(this.camera.target, this.target) < Engine.Epsilon * 10) {
                            this.target = null;
                        }
                        else {
                            this.camera.goToPosition(this.target);
                        }
                    }
                };
                return GameCamera;
            })();
            exports_1("default", GameCamera);
        }
    }
});
//# sourceMappingURL=gameCamera.js.map