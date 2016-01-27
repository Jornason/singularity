System.register(['angular2/core', "../common/gameCamera", "../common/gameLight", "../common/GameScene", "../common/galaxy"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, gameCamera_1, gameLight_1, GameScene_1, galaxy_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (gameCamera_1_1) {
                gameCamera_1 = gameCamera_1_1;
            },
            function (gameLight_1_1) {
                gameLight_1 = gameLight_1_1;
            },
            function (GameScene_1_1) {
                GameScene_1 = GameScene_1_1;
            },
            function (galaxy_1_1) {
                galaxy_1 = galaxy_1_1;
            }],
        execute: function() {
            Engine = BABYLON.Engine;
            AppComponent = (function () {
                function AppComponent() {
                    var _this = this;
                    var self = this;
                    this.canvas = document.getElementById('renderCanvas');
                    this.engine = new Engine(this.canvas, true);
                    this.scene = new GameScene_1.default(this.engine);
                    this.camera = new gameCamera_1.default(this.canvas, this.scene);
                    this.light = new gameLight_1.default(this.scene);
                    this.galaxy = new galaxy_1.default(this.scene, this.engine);
                    this.engine.runRenderLoop(function () {
                        _this.camera.run();
                        _this.light.run();
                        _this.galaxy.run();
                        _this.scene.run();
                    });
                    window.addEventListener('resize', function () {
                        self.engine.resize();
                    });
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        template: '<canvas id="renderCanvas"></canvas>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.js.map