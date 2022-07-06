// -- Borrowing a method --
// For instructions refer to https://eloquentjavascript.net/06_object.html and go to Exercises (end
// of chapter)

let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
// console.log(map.hasOwnProperty("one"));

let call = Object.prototype.hasOwnProperty.call(map, "one");

if (import.meta.vitest) {
    const { describe, expect, it } = import.meta.vitest;

    describe("Borrowing a method", () => {
        it("map should have 'one' property", () => {
            expect(call).toBe(true);
        });
    });
}
