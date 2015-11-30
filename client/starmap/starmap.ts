/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/d3.d.ts" />
import {Component, View, Inject, ElementRef, NgFor} from "angular2/angular2";
import Config from "../../lib/config";
import {Planets} from "../../lib/collection/planets";
import {createEllipticalGalaxy} from "../../lib/install/galaxyGenerator";

@Component({
    selector: "starmap",
    providers: [Config]
})
@View({
    templateUrl: "client/starmap/starmap.html",
    directives: [NgFor]
})
export default class Starmap {

    private svg;
    private zoom;
    private x;
    private y;
    private xAxis;
    private yAxis;
    private planetsG;
    private elem;
    private planets;
    private galaxy;

    private self: Starmap;

    constructor(
        @Inject(ElementRef) elementRef,
        @Inject(Config) options
    ) {
        this.self = this;
        this.galaxy = options.galaxy;
        //this.planets = Planets.find();
        this.planets = createEllipticalGalaxy(
            800, //width
            800, //height
            3000, //number
            0, //rotation
            0 //distance
        );
        this.elem = elementRef.nativeElement;
        this.create();
    }

    create() {

        let width = this.elem.clientWidth,
            height = this.elem.clientHeight,
            margin = { top: 20, right: 20, bottom: 20, left: 40 },
            ratio = width / height,
            ticks = [],
            planets = [];

        d3.select("#starmap svg").attr("width", width).attr("height", height);

        ticks = this.getTicks(this.galaxy);
        planets = this.getPlanets();

        this.x = d3.scale.linear()
            .domain([-width / 2, width / 2])
            .range([0, width])
            .nice();

        this.y = d3.scale.linear()
            .domain([-height / 2, height / 2])
            .range([height, 0])
            .nice();

        this.xAxis = d3.svg.axis()
            .scale(this.x)
            .orient("bottom")
            .tickSize(-height)
            .ticks(8)
            .tickValues(ticks);

        this.yAxis = d3.svg.axis()
            .scale(this.y)
            .orient("left")
            .tickSize(-width)
            .ticks(8)
            .tickValues(ticks);

        this.zoom = d3.behavior.zoom()
            .x(this.x)
            .y(this.y)
            .scaleExtent([1, 5])
            .center([width / 2, height / 2])
            .size([width, height])
            .on("zoom", () => this.onZoom());

        this.svg = d3.select(".g-base")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(this.zoom);

        this.svg.append("rect")
            .attr("width", width)
            .attr("height", height);

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.xAxis);

        this.svg.append("g")
            .attr("class", "y axis")
            .call(this.yAxis);

        this.planetsG = this.svg.append("g")
            .attr("class", "stars")
            .call(this.zoom);

        let circle = this.planetsG.selectAll("circle")
            .data(planets)
            .enter()
            .append("circle")
            .attr("cx", function (c) {
                return c.cx
            })
            .attr("cy", function (c) {
                return c.cy
            })
            .attr("r", 2)
            .attr("fill", "red");
    }

    private getTicks(galaxy) {
        let ticks = [],
            i = galaxy.x.min;

        while (i <= galaxy.x.max) {
            ticks.push(i);
            i += 100;
        }

        return ticks;
    }

    private getPlanets() {
        let planets = [];

        for (let i = 0; i < this.planets.length; i++) {
            var p = this.planets[i];
            planets.push({
                cx: p.position.X,
                cy: p.position.Y,
                r: 2,
                fill: "red"
            });
        }

        return planets;
    }

    private onZoom() {
        let reset_s = 0;
        if ((this.x.domain()[1] - this.x.domain()[0]) >= (this.galaxy.x.max - this.galaxy.x.min)) {
            this.zoom.x(this.x.domain([this.galaxy.x.min, this.galaxy.x.max]));
            reset_s = 1;
        }
        if ((this.y.domain()[1] - this.y.domain()[0]) >= (this.galaxy.y.max - this.galaxy.y.min)) {
            this.zoom.y(this.y.domain([this.galaxy.y.min, this.galaxy.y.max]));
            reset_s += 1;
        }
        if (reset_s == 2) {
            this.zoom.scale(1);
            this.zoom.translate([0,0]);
        }
        else {
            if (this.x.domain()[0] < this.galaxy.x.min) {
                this.x.domain([this.galaxy.x.min, this.x.domain()[1] - this.x.domain()[0] + this.galaxy.x.min]);
            }
            if (this.x.domain()[1] > this.galaxy.x.max) {
                var xdom0 = this.x.domain()[0] - this.x.domain()[1] + this.galaxy.x.max;
                this.x.domain([xdom0, this.galaxy.x.max]);
            }
            if (this.y.domain()[0] < this.galaxy.y.min) {
                this.y.domain([this.galaxy.y.min, this.y.domain()[1] - this.y.domain()[0] + this.galaxy.y.min]);
            }
            if (this.y.domain()[1] > this.galaxy.y.max) {
                var ydom0 = this.y.domain()[0] - this.y.domain()[1] + this.galaxy.y.max;
                this.y.domain([ydom0, this.galaxy.y.max]);
            }
        }

        this.svg.select(".x.axis").call(this.xAxis);
        this.svg.select(".y.axis").call(this.yAxis);
        //noinspection TypeScriptUnresolvedVariable
        this.planetsG.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    private onClick(value) {
        this.svg.call(this.zoom.event); // https://github.com/mbostock/d3/issues/2387

        // Record the coordinates (in data space) of the center (in screen space).
        let center0 = this.zoom.center(), translate0 = this.zoom.translate(), coordinates0 = this.coordinates(center0);
        this.zoom.scale(this.zoom.scale() * Math.pow(2, + value));

        // Translate back to the center.
        var center1 = this.point(coordinates0);
        this.zoom.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);

        this.svg.transition().duration(750).call(this.zoom.event);
    }

    private coordinates(point) {
        let scale = this.zoom.scale(), translate = this.zoom.translate();
        return [(point[0] - translate[0]) / scale, (point[1] - translate[1]) / scale];
    }

    private point(coordinates) {
        let scale = this.zoom.scale(), translate = this.zoom.translate();
        return [coordinates[0] * scale + translate[0], coordinates[1] * scale + translate[1]];
    }
}
