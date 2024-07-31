// kettlebells: 8.8, 13.2, 17.6, 22, 26.4, 30.8, 35.2, 39.6, 44, 48.4, 52.8,
const LEGS = {
  // treadmill 2min each: forward front/back, sideways left/right, backwards
  Squat: [135, 155, 175], // quads, hams, glutes
  "Kettlebell Lunges": [
    8.8, 13.2, 17.6, 22, 26.4, 30.8, 35.2, 39.6, 44, 48.4, 52.8,
  ], // glutes, hams, quads, calves
  Calves: [200], // calves (bodyweight)
};

const FRONT = {
  "Bench Press": [135, 155, 175], // pecs, delts, triceps, biceps, serratus
  "Overhead Press": [45, 55, 65, 75, 85, 95, 105, 115, 125, 135], // pecs, delts, triceps, traps
  "Bicep Curls": [20, 25, 30, 35, 40, 45], // biceps
  Abs: [200], // (bodyweight)
};

const BACK = {
  Deadlift: [135, 155, 175, 195, 225, 245, 265, 285], // glutes, hams, core, back, traps
  "Cable Rows": [80, 90, 100, 110, 120, 130, 140, 150], // lats, traps, delts, bicpes, triceps
  "Cable Pull Downs": [100, 110, 120, 130, 140], // lats, traps, biceps, core, delts, shoulders
  "Cable Tricep": [20, 30, 40, 50], // triceps
};

export const WORKOUTS = {
  "MONDAY (LEGS)": LEGS,
  "WEDNESDAY (FRONT)": FRONT,
  "FRIDAY (BACK)": BACK,
};
