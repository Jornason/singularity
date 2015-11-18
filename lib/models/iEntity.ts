import Vector2 from "./vector2";

export interface IEntity {
    name:string;
    position:Vector2;

    update();
}