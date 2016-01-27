System.register(["./spiralGalaxy"], function(exports_1) {
    var spiralGalaxy_1;
    var Galaxy;
    return {
        setters:[
            function (spiralGalaxy_1_1) {
                spiralGalaxy_1 = spiralGalaxy_1_1;
            }],
        execute: function() {
            StandardMaterial = BABYLON.StandardMaterial;
            Texture = BABYLON.Texture;
            Axis = BABYLON.Axis;
            Space = BABYLON.Space;
            ActionManager = BABYLON.ActionManager;
            ExecuteCodeAction = BABYLON.ExecuteCodeAction;
            Vector3 = BABYLON.Vector3;
            Galaxy = (function () {
                function Galaxy(scene, engine) {
                    this.scene = scene;
                    this.engine = engine;
                    this.galaxy = new spiralGalaxy_1.default(800, 800, 5000, 4, 0.5, 5, 0.02);
                    this.planets = new Array();
                    this.renderGalaxy();
                }
                Galaxy.prototype.run = function () {
                    if (this.target) {
                        this.scene.activeCamera.goToPosition(this.target);
                        if (Vector3.Distance(this.scene.activeCamera.target, this.target) <= 0.5) {
                            this.target = null;
                        }
                    }
                    for (var _i = 0, _a = this.planets; _i < _a.length; _i++) {
                        var planet = _a[_i];
                        planet.rotate(Axis.Y, 0.005, Space.LOCAL);
                    }
                };
                Galaxy.prototype.renderGalaxy = function () {
                    var self = this;
                    var sphere = new Mesh.CreateSphere('original', 50, 1, this.scene);
                    var material = new StandardMaterial('planet_a', this.scene);
                    material.diffuseTexture = new Texture('/client/assets/planets/planet_c_normal.jpg', this.scene);
                    material.bumpTexture = new Texture('/client/assets/planets/planet_c_bump-2.jpg', this.scene);
                    //let ground = Mesh.CreateGroundFromHeightMap('ground', '/client/assets/planets/planet_c_height.png', 1, 1, 1, 0, 10, this.scene);
                    //ground.material = material;
                    sphere.material = material;
                    /*
                    let radioColor = new Color3(59 / 255, 201 / 255, 115 / 255);
                    let radioMat = new StandardMaterial('radio-mat', this.scene);
                    radioMat.diffuseColor = radioColor;
                    radioMat.emissiveColor = radioColor;
                    //radioMat.specularColor = radioColor;
                    radioMat.alpha = 0.2;
            
                    let radio = Mesh.CreateDisc('radio', 3.0, 64, this.scene);
                    radio.material = radioMat;
                    radio.rotation.x = Math.PI / 2;
                    */
                    for (var _i = 0, _a = this.galaxy.planets; _i < _a.length; _i++) {
                        var planet = _a[_i];
                        /*
                        let godrays = new VolumetricLightScatteringPostProcess('godrays', 1.0, this.scene.activeCamera, null, 100, Texture.BILINEAR_SAMPLINGMODE, this.engine, false);
                        godrays.mesh.material.diffuseTexture = new Texture('/client/assets/planets/sun.png', this.scene, true, false, Texture.BILINEAR_SAMPLINGMODE);
                        godrays.mesh.material.diffuseTexture.hasAlpha = true;
                        godrays.mesh.position = planet.position;
                        */
                        var newSphere = sphere.clone(planet.name);
                        newSphere.position = planet.position;
                        newSphere.rotation.x = -0.27;
                        newSphere.actionManager = new ActionManager(this.scene);
                        newSphere.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, function (e) {
                            self.target = e.source.position;
                        }));
                        /*
                                    let newRadio = radio.clone('radio-' + planet.name);
                                    newRadio.position = planet.position;
                        */
                        this.planets.push(newSphere);
                    }
                };
                return Galaxy;
            })();
            exports_1("default", Galaxy);
        }
    }
});
//# sourceMappingURL=galaxy.js.map