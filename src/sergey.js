export function arrayRange(min, max, step) {
    let array = [];
    for (let i = min; i <= max; i += step) {
        array.push(i);
    }
    return array;
}

const kettlebellWeights = [
    8.8, 13.2, 17.6, 22, 26.4, 30.8, 35.2, 39.6, 44, 48.4, 52.8,
];

const LEGS = {
    // forward front/back, sideways left/right, backwards treadmill walk
    Squat: arrayRange(135, 185, 5), // quads, hams, glutes
    "Kettlebell Lunges": kettlebellWeights, // glutes, hams, quads, calves
    Calves: [200], // calves (bodyweight)
};

// push: chest, shoulders, and triceps
const FRONT = {
    "Bench Press": arrayRange(135, 185, 5), // pecs, delts, triceps, biceps, serratus
    "Overhead Press": arrayRange(45, 135, 10), // pecs, delts, triceps, traps
    "Bicep Curls": arrayRange(20, 45, 5), // biceps
    Abs: [200], // (bodyweight)
};

// pull: back and biceps
const BACK = {
    Deadlift: arrayRange(135, 285, 10), // glutes, hams, core, back, traps
    "Cable Rows": arrayRange(80, 150, 10), // lats, traps, delts, bicpes, triceps
    "Cable Pull Downs": arrayRange(100, 200, 10), // lats, traps, biceps, core, delts, shoulders
    "Cable Tricep": arrayRange(20, 50, 10), // triceps
};

export const WORKOUTS = {
    "MONDAY (LEGS)": LEGS,
    "WEDNESDAY (FRONT)": FRONT,
    "FRIDAY (BACK)": BACK,
};

