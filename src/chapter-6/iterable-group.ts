// -- Groups --
// This implementation and the previous exercise are not exactly the same since one will accept
// numbers and the other string values
// For instructions refer to https://eloquentjavascript.net/06_object.html and go to Exercises (end
// of chapter)

export default class Group {
    values: string[];
    constructor() {
        this.values = [];
    }

    add(value: string): void {
        if (!this.has(value)) {
            this.values.push(value);
        }
    }

    delete(value: string): void {
        if (this.has(value)) {
            let index = this.values.indexOf(value);
            this.values.splice(index, 1);
        }
    }

    has(value: string): boolean {
        return this.values.indexOf(value) === -1 ? false : true;
    }

    static from(range: string[]): Group {
        let group = new Group();
        for (const element in range) {
            if (range.hasOwnProperty(element)) {
                const value = range[element];
                group.add(value);
            }
        }
        return group;
    }
    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}

class GroupIterator {
    group: Group;
    position: number;
    constructor(group: Group) {
        this.group = group;
        this.position = 0;
    }

    next(): { value?: string; done: boolean } {
        if (this.position === this.group.values.length) {
            return { done: true };
        }
        let value = this.group.values[this.position];
        this.position += 1;
        return { value: value, done: false };
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
            group.add("a");
            expect(group.values).toContain("a");
        });

        it("doesn't add values if they are already present", () => {
            group.add("a");
            group.add("a");
            let isDuplicate = group.values.some(
                (item, index) => index !== group.values.indexOf(item)
            );
            expect(isDuplicate).toBe(false);
        });

        it("can check if has values", () => {
            expect(group.has("a")).toBe(false);
            group.add("a");
            expect(group.has("a")).toBe(true);
        });

        it("can delete values", () => {
            group.delete("a");
            group.add("a");
            group.delete("a");
            expect(group.values).not.toContain("a");
        });

        it("from takes an iterable object and creates a group containing all the values", () => {
            let values: string[] = ["a", "b", "c"];
            let group = Group.from(values);
            for (const element in values) {
                if (values.hasOwnProperty(element)) {
                    const number = values[element];
                    expect(group.values).toContain(number);
                }
            }
            expect(group.values).not.toContain("d");
        });
    });
    describe("Iterable group", () => {
        let group: Group;
        let groupIterator: GroupIterator;
        beforeEach(() => {
            group = Group.from(["a", "b", "c"]);
            groupIterator = Group.from(["a", "b", "c"])[Symbol.iterator]();
        });

        it("is iterable", () => {
            for (const value of group) {
                expect(group.values).toContain(value);
            }
        });

        it("next method gives the next value", () => {
            expect(groupIterator.next()).toEqual({ value: "a", done: false });
            expect(groupIterator.next()).toEqual({ value: "b", done: false });
            expect(groupIterator.next()).toEqual({ value: "c", done: false });
        });

        it("next method returns 'done: true' when finished iterating", () => {
            groupIterator.next();
            groupIterator.next();
            groupIterator.next();
            expect(groupIterator.next()).toEqual({
                value: undefined,
                done: true,
            });
        });
    });
}
