// -- A vector type --
// For instructions refer to https://eloquentjavascript.net/06_object.html and go to Exercises (end
// of chapter)
export default class Vec {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plus(vector: Vec): Vec {
        return new Vec(this.x + vector.x, this.y + vector.y);
    }

    minus(vector: Vec): Vec {
        return new Vec(this.x - vector.x, this.y - vector.y);
    }

    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

if (import.meta.vitest) {
    const { describe, expect, it, beforeEach } = import.meta.vitest;

    describe("class Vec", () => {
        let vector: Vec;
        beforeEach(() => {
            vector = new Vec(1, 2);
        });

        it("initialize with properties x and y defined", () => {
            expect(vector.x).toBe(1);
            expect(vector.y).toBe(2);
        });

        it("plus method returns a new vector correctly", () => {
            let vector2 = new Vec(2, 3);
            let vectorPlus = vector.plus(vector2);
            expect(vectorPlus.x).toBe(3);
            expect(vectorPlus.y).toBe(5);
        });

        it("minus method returns a new vector correctly", () => {
            let vector2 = new Vec(2, 3);
            let vectorMinus = vector.minus(vector2);
            expect(vectorMinus.x).toBe(-1);
            expect(vectorMinus.y).toBe(-1);
        });

        it("the length get method works correctly", () => {
            expect(vector.length).toBe(Math.sqrt(5));
            expect(new Vec(3, 4).length).toBe(5);
        });
    });
}
