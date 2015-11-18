import Vector2 from "./vector2";
import {PlanetTypes} from "./planetTypes";
import {IEntity} from "./iEntity";

export default class Planet implements IEntity {

    name:string;
    position:Vector2;
    type:PlanetTypes;

    constructor(options?) {
        if (options) {
            this.name = options.name;
            this.position = options.position;
            this.type = options.type;
        }
    }

    update() {
        //todo
    }
}