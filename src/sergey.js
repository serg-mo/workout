// kettlebells: 8.8, 13.2, 17.6, 22, 26.4, 30.8, 35.2, 39.6, 44, 48.4, 52.8,
export const WORKOUTS = {
  "MONDAY (LEGS)": {
    // treadmill 2min each: forward front/back, sideways left/right, backwards
    Squat: [135, 155, 175], // quads, hams, glutes
    "Kettlebell Lunges": [26.4, 30.8, 35.2], // glutes, hams, quads, calves
    Calves: [0, 5, 10, 15], // calves (bodyweight)
    "Back Extensions": [0, 5, 10, 15], // (bodyweight)
  },
  "WEDNESDAY (FRONT)": {
    "Bench Press": [135, 155, 175], // pecs, delts, triceps, biceps, serratus
    "Overhead Press": [65, 75, 85, 95, 105], // pecs, delts, triceps, traps
    "Bicep Curls": [20, 22.5, 25, 27.5, 30], // biceps
    Abs: [0, 5, 10, 15], // (bodyweight)
  },
  "FRIDAY (BACK)": {
    Deadlift: [135, 155, 175, 195, 225], // glutes, hams, core, back, traps
    "Cable Rows": [100, 110, 120, 130], // lats, traps, delts, bicpes, triceps
    "Cable Pull Downs": [100, 120, 140], // lats, traps, biceps, core, delts, shoulders
    "Cable Tricep": [20, 30, 40, 50], // triceps
  },
};
