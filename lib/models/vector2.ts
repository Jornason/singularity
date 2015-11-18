export default class Vector2 {
    X:number;
    Y:number;

    constructor(options?) {
        if (options) {
            this.X = options.X;
            this.Y = options.Y;
        } else {
            this.X = 0;
            this.Y = 0;
        }
    }
}