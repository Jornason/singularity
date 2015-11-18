/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, bootstrap} from "angular2/angular2";
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

@Component({
    selector: "app"
})
@View({
    templateUrl: "client/app/app.html",
    directives: [NgFor, ROUTER_DIRECTIVES]
})
class App {
    constructor() {
    }
}

bootstrap(App, [ROUTER_PROVIDERS]);