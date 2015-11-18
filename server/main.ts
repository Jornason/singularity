/// <reference path="../typings/angular2-meteor.d.ts" />
import Movable from "../lib/models/movable";
import Planet from "../lib/models/planet";
import {createPlanets} from "./install/createPlanets";

Meteor.startup(function () {
    console.log("Server started...");
    let initialized = false;

    if (!initialized) {
        createPlanets();
    }

});