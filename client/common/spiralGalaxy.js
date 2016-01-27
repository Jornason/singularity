System.register(['./planet', "../utils/mersenneTwister"], function(exports_1) {
    var planet_1, mersenneTwister_1;
    var PI, SpiralGalaxy;
    return {
        setters:[
            function (planet_1_1) {
                planet_1 = planet_1_1;
            },
            function (mersenneTwister_1_1) {
                mersenneTwister_1 = mersenneTwister_1_1;
            }],
        execute: function() {
            Vector3 = BABYLON.Vector3;
            PI = Math.PI;
            SpiralGalaxy = (function () {
                function SpiralGalaxy(width, height, count, arms, armOffsetMax, rotationFactor, randomOffsetXY) {
                    this.planets = new Array();
                    var mt = new mersenneTwister_1.default(new Date().getTime());
                    var minDistance = 2;
                    var numArms = arms || 5;
                    var armSeparationDistance = 2 * PI / numArms;
                    var armOffsetMax = armOffsetMax || 0.5;
                    var rotationFactor = rotationFactor || 5;
                    var randomOffsetXY = randomOffsetXY || 0.02;
                    for (var i = 0; i < count; i++) {
                        //let distance = mt.genrand_real3();
                        var distance = Math.pow(mt.genrand_real3(), 2);
                        var angle = mt.genrand_real3() * 2 * PI;
                        var armOffset = mt.genrand_real3() * armOffsetMax;
                        armOffset = armOffset - armOffsetMax / 2;
                        armOffset = armOffset * (1 / distance);
                        var squaredAmrOffset = Math.pow(armOffset, 2);
                        if (armOffset < 0)
                            squaredAmrOffset = squaredAmrOffset * -1;
                        armOffset = squaredAmrOffset;
                        var rotation = distance * rotationFactor;
                        angle = parseInt(angle / armSeparationDistance) * armSeparationDistance + armOffset + rotation;
                        var starX = Math.cos(angle) * distance;
                        var starY = Math.sin(angle) * distance;
                        do {
                            var rndOffsetX = mt.genrand_real3() * randomOffsetXY;
                            var rndOffsetY = mt.genrand_real3() * randomOffsetXY;
                            starX += rndOffsetX;
                            starY += rndOffsetY;
                            starX *= width;
                            starY *= height;
                            var hasClose = _.find(this.planets, function (p) {
                                return Vector3.Distance(p.position, new Vector3(starX, 0, starY)) <= minDistance;
                            });
                        } while (hasClose);
                        this.planets.push(new planet_1.default('Planet ' + i.toString(), new Vector3(starX, 0, starY)));
                    }
                }
                return SpiralGalaxy;
            })();
            exports_1("default", SpiralGalaxy);
        }
    }
});
//# sourceMappingURL=spiralGalaxy.js.map