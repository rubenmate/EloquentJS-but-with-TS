// -- Groups --
// For instructions refer to https://eloquentjavascript.net/06_object.html and go to Exercises (end
// of chapter)
export default class Group {
    values: number[];
    constructor() {
        this.values = [];
    }

    add(number: number): void {
        if (!this.has(number)) {
            this.values.push(number);
        }
    }

    delete(number: number): void {
        if (this.has(number)) {
            let index = this.values.indexOf(number);
            this.values.splice(index, 1);
        }
        // TODO: Do it with filter
    }

    has(number: number): boolean {
        return this.values.indexOf(number) === -1 ? false : true;
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

    describe("class Group", () => {
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
            let range: number[] = [10, 20];
            let group = Group.from(range);
            for (const element in range) {
                if (range.hasOwnProperty(element)) {
                    const number = range[element];
                    expect(group.values).toContain(number);
                }
            }
            expect(group.values).not.toContain(30);
        });
    });
}
