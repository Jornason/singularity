import Vector3 = BABYLON.Vector3;
import {PlanetType} from "./planetType";

export default class Planet {

    name: string;
    position: Vector3;
    type: PlanetType;

    constructor(name: string, position: Vector3) {
        this.name = name;
        this.position = position;
    }
}