// -- Groups --
// This implementation and the next exercise are not exactly the same since one will accept numbers
// and the other String values
// For instructions refer to https://eloquentjavascript.net/06_object.html and go to Exercises (end
// of chapter)

export default class Group {
    values: number[];
    constructor() {
        this.values = [];
    }

    add(value: number): void {
        if (!this.has(value)) {
            this.values.push(value);
        }
    }

    delete(value: number): void {
        if (this.has(value)) {
            let index = this.values.indexOf(value);
            this.values.splice(index, 1);
        }
        // TODO: Do it with filter
    }

    has(value: number): boolean {
        return this.values.indexOf(value) === -1 ? false : true;
    }

    static from(range: number[]): Group {
        let group = new Group();
        for (const element in range) {
            if (range.hasOwnProperty(element)) {
                const number = range[element];
                group.add(number);
            }
        }
        return group;
    }
}

if (import.meta.vitest) {
    const { describe, expect, it, beforeEach } = import.meta.vitest;

    describe("Class Group", () => {
        let group: Group;
        beforeEach(() => {
            group = new Group();
        });

        it("initialize with empty values", () => {
            expect(group.values).toStrictEqual([]);
        });

        it("can add values", () => {
            group.add(10);
            expect(group.values).toContain(10);
        });

        it("doesn't add values if they are already present", () => {
            group.add(10);
            group.add(10);
            let isDuplicate = group.values.some(
                (item, index) => index !== group.values.indexOf(item)
            );
            expect(isDuplicate).toBe(false);
        });

        it("can check if has values", () => {
            expect(group.has(10)).toBe(false);
            group.add(10);
            expect(group.has(10)).toBe(true);
        });

        it("can delete values", () => {
            group.delete(10);
            group.add(10);
            group.delete(10);
            expect(group.values).not.toContain(10);
        });

        it("from takes an iterable object and creates a group containing all the values", () => {
            let values: number[] = [10, 20];
            let group = Group.from(values);
            for (const element in values) {
                if (values.hasOwnProperty(element)) {
                    const number = values[element];
                    expect(group.values).toContain(number);
                }
            }
            expect(group.values).not.toContain(30);
        });
    });
}
