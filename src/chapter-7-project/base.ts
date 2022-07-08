const roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    "Marketplace-Farm",
    "Marketplace-Post Office",
    "Marketplace-Shop",
    "Marketplace-Town Hall",
    "Shop-Town Hall",
];

type Graph = { [key: string]: string[] };

function buildGraph(edges: string[]): Graph {
    let graph: Graph = Object.create(null);
    function addEdge(from: string, to: string) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (const [from, to] of edges.map((r) => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

type Parcel = { place: string; address: string };

class VillageState {
    place: string;
    parcels: Parcel[];
    constructor(place: string, parcels: Parcel[]) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination: string) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels
                .map((p) => {
                    if (p.place != this.place) return p;
                    return { place: destination, address: p.address };
                })
                .filter((p) => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }

    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph));
            let place;
            do {
                place = randomPick(Object.keys(roadGraph));
            } while (place == address);
            parcels.push({ place, address });
        }
        return new VillageState("Post Office", parcels);
    }
}

type Action = { direction: string; memory?: string[] };
type RobotFunction = (state: VillageState, memory: string[]) => Action;

function runRobot(
    state: VillageState,
    robot: RobotFunction,
    memory?: string[]
    // FIXME: Memory may be something that is not now
) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        // TODO: robot function takes an optional second parameter
        let action: Action = robot(state, memory!);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array: string[]) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state: VillageState): Action {
    return { direction: randomPick(roadGraph[state.place]) };
}

// A route that passes all places in the village
const mailRoute = [
    "Alice's House",
    "Cabin",
    "Alice's House",
    "Bob's House",
    "Town Hall",
    "Daria's House",
    "Ernie's House",
    "Grete's House",
    "Shop",
    "Grete's House",
    "Farm",
    "Marketplace",
    "Post Office",
];

function routeRobot(_state: VillageState, memory: string[]): Action {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph: Graph, from: string, to: string) {
    let work = [{ at: from, route: [] as string[] }];
    for (let i = 0; i < work.length; i++) {
        const { at, route } = work[i];
        for (const place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some((w) => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
    return work[0].route;
}

function goalOrientedRobot({ place, parcels }: VillageState, route: string[]) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (place != parcel.place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

export { VillageState, runRobot, randomRobot, routeRobot, goalOrientedRobot };
export type { RobotFunction, Action };
