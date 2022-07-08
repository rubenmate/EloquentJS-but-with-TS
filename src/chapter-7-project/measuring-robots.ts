import {
    VillageState,
    randomRobot,
    routeRobot,
    goalOrientedRobot,
    RobotFunction,
    Action,
} from "./base";

function countSteps(
    state: VillageState,
    robot: RobotFunction,
    memory?: string[]
) {
    for (let steps = 0; ; steps++) {
        if (state.parcels.length == 0) return steps;
        let action: Action = robot(state, memory!);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

function compareRobots(
    robot1: RobotFunction,
    memory1: string[],
    robot2: RobotFunction,
    memory2: string[]
) {
    let village = VillageState.random();
    let totalStepsR1: number = 0;
    let totalStepsR2: number = 0;

    for (let index = 0; index < 100; index++) {
        totalStepsR1 += countSteps(village, robot1, memory1);
        totalStepsR2 += countSteps(village, robot2, memory2);
    }
    let averageStepsR1 = totalStepsR1 / 100;
    let averageStepsR2 = totalStepsR2 / 100;

    console.log(`Average steps of ${robot1.name} is ${averageStepsR1}`);
    console.log(`Average steps of ${robot2.name} is ${averageStepsR2}`);
}

if (import.meta.vitest) {
    const { describe, expect, it, vi, test } = import.meta.vitest;

    describe("Measuring robots", () => {
        test("countSteps returns a value", () => {
            let village = VillageState.random();

            const fnSpy = vi.fn(countSteps);
            expect(fnSpy).not.toHaveReturned();
            fnSpy(village, randomRobot);
            expect(fnSpy).toHaveReturned();
        });
        it("function runs with no failure", () => {
            expect(() =>
                compareRobots(routeRobot, [], goalOrientedRobot, [])
            ).not.toThrowError();
        });

        it("function runs with no failure", () => {
            expect(() =>
                compareRobots(randomRobot, [], goalOrientedRobot, [])
            ).not.toThrowError();
        });
    });
}
