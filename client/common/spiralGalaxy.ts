import Vector3 = BABYLON.Vector3;
import Planet from './planet';
import MersenneTwister from "../utils/mersenneTwister";

const PI = Math.PI;

export default class SpiralGalaxy {

    planets: Array;

    constructor(width: number,
                height: number,
                count: number,
                arms: number,
                armOffsetMax: number,
                rotationFactor: number,
                randomOffsetXY: number
    ) {
        this.planets = new Array();

        let mt = new MersenneTwister(new Date().getTime());
        let minDistance = 2;

        let numArms = arms || 5;
        let armSeparationDistance = 2 * PI / numArms;
        let armOffsetMax = armOffsetMax || 0.5;
        let rotationFactor = rotationFactor || 5;
        let randomOffsetXY = randomOffsetXY || 0.02;

        for (let i = 0; i < count; i++) {

            //let distance = mt.genrand_real3();
            let distance = Math.pow(mt.genrand_real3(), 2);
            let angle = mt.genrand_real3() * 2 * PI;
            let armOffset = mt.genrand_real3() * armOffsetMax;
            armOffset = armOffset - armOffsetMax / 2;
            armOffset = armOffset * (1 / distance);

            let squaredAmrOffset = Math.pow(armOffset, 2);
            if (armOffset < 0)
                squaredAmrOffset = squaredAmrOffset * -1;

            armOffset = squaredAmrOffset;
            let rotation = distance * rotationFactor;
            angle = parseInt(angle / armSeparationDistance) * armSeparationDistance + armOffset + rotation;

            let starX = Math.cos(angle) * distance;
            let starY = Math.sin(angle) * distance;

            do {
                let rndOffsetX = mt.genrand_real3() * randomOffsetXY;
                let rndOffsetY = mt.genrand_real3() * randomOffsetXY;

                starX += rndOffsetX;
                starY += rndOffsetY;
                starX *= width;
                starY *= height;

                let hasClose = _.find(this.planets, function (p) {
                    return Vector3.Distance(p.position, new Vector3(starX, 0, starY)) <= minDistance;
                });
            } while (hasClose);


            this.planets.push(new Planet('Planet ' + i.toString(), new Vector3(starX, 0, starY)));
        }
    }
}