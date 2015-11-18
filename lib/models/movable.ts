import {IEntity} from "./iEntity";
import Vector2 from "./vector2";

export default class Movable implements IEntity {

    name:string;
    position:Vector2;
    target:Vector2;
    velocity:number;
    startMovingOn:Date;

    constructor() {
        this.name = "Unkown Flying Object";
        this.position = new Vector2();
        this.target = new Vector2();
        this.velocity = 0;
    }

    update() {
        //todo
    }
}