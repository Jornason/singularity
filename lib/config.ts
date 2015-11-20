/// <reference path="../typings/angular2-meteor.d.ts" />
import {Injector, provide} from "angular2/angular2";

export default class Config {
    galaxy = {
        x: {
            min: -2000,
            max: 2000
        },
        y: {
            min: -2000,
            max: 2000
        }
    }
}
