System.register([], function(exports_1) {
    var Planet;
    return {
        setters:[],
        execute: function() {
            Planet = (function () {
                function Planet(name, position) {
                    this.name = name;
                    this.position = position;
                }
                return Planet;
            })();
            exports_1("default", Planet);
        }
    }
});
//# sourceMappingURL=planet.js.map