System.register([], function(exports_1) {
    var GameLight;
    return {
        setters:[],
        execute: function() {
            HemisphericLight = BABYLON.HemisphericLight;
            Color3 = BABYLON.Color3;
            Vector3 = BABYLON.Vector3;
            PointLight = BABYLON.PointLight;
            GameLight = (function () {
                function GameLight(scene) {
                    this.scene = scene;
                    this.hemi = new HemisphericLight('hemi', new Vector3(0, 50, -100), scene);
                    this.hemi.intensity = 1;
                    this.hemi.diffuse = new Color3(1, 1, 1);
                    this.hemi.specular = new Color3(0, 0, 0);
                    this.hemi.groundColor = new Color3(0, 0, 0);
                    this.sun = new PointLight('sun', new Vector3(0, 10, 10), scene);
                }
                GameLight.prototype.run = function () {
                };
                return GameLight;
            })();
            exports_1("default", GameLight);
        }
    }
});
//# sourceMappingURL=gameLight.js.map