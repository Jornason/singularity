/// <reference path="../typings/angular2-meteor.d.ts" />
import {createSpiralGalaxy} from "./install/galaxyGenerator";

Meteor.startup(function () {
    console.log("Server started...");
    let initialized = false;

    //if (!initialized) {
    //    let planets = createSpiralGalaxy(
    //        800, //width
    //        800, //height
    //        3000, //number
    //        4, //arms
    //        0.5, //armOffsetMax
    //        5, //rotationFactor
    //        0.02 //randomOffsetXY
    //    );
    //}

});