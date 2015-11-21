///<reference path="../../lib/utils/mersenneTwister.ts"/>
import Planet from "../../lib/models/planet";
import {PlanetTypes} from "../../lib/models/planetTypes";
import Vector2 from "../../lib/models/vector2";
import MersenneTwister from "../../lib/utils/mersenneTwister";

let PI = Math.PI;

function rnd() {
    return new MersenneTwister(Date.now());
}


export function createSpiralGalaxy(width, height, number, arms, armOffsetMax, rotationFactor, randomOffsetXY) {
    let planets = [];

    var numArms = arms || 5;
    var armSeparationDistance = 2 * this.PI / numArms;
    var armOffsetMax = armOffsetMax || 0.5;
    var rotationFactor = rotationFactor || 5;
    var randomOffsetXY = randomOffsetXY || 0.02;

    for (var i = 0; i < number; i++) {

        var distance = Math.pow(rnd().genrand_real3(), 2);
        var angle = rnd().genrand_real3() * 2 * this.PI;
        var armOffset = rnd().genrand_real3() * armOffsetMax;
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

        var rndOffsetX = rnd().genrand_real3() * randomOffsetXY;
        var rndOffsetY = rnd().genrand_real3() * randomOffsetXY;

        starX += rndOffsetX;
        starY += rndOffsetY;

        planets.push(new Planet({
            name: "Planet " + i.toString(),
            type: PlanetTypes.undefined,
            position: new Vector2({
                X: starX * width,
                Y: starY * height
            })
        }));
    }

    return planets;
}

export function createBarredSpiralGalaxy() {
    //todo
}

export function createIrregularGalaxy() {
    //todo
}

export function createPeculiarGalaxy() {
    //todo
}

export function createEllipticalGalaxy() {
    //todo
}

export function createLenticularGalaxy() {
    //todo
}