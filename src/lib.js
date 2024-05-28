import moment from "moment";

// TODO: these should map to equipment, which maps to weights
const LEGS = {
  Squat: "barbell", // 17 safeguards, [quads, hams, glutes]
  "Kettlebell Lunges": "kettlebell", // [glutes, hams, quads, calves]
  "Cable Side Lunges": "cable", // [quads, abductors, glutes, hams]
  "Calve Raises": "dumbbell", // [calves]
};

// push: chest, shoulders, and triceps
const FRONT = {
  "Bench Press": "barbell", // [pecs, delts, triceps, biceps, serratus]
  "Overhead Press": "barbell", // [pecs, delts, triceps, traps]
  "Cable Rows": "cable", // [lats, traps, delts, bicpes, triceps]
  "Tricep Extensions": "cable", // [triceps]
};

// pull: back and biceps
const BACK = {
  Deadlift: "barbell", // [glutes, hams, core, back, traps]
  "Kettlebell Snatch": "kettlebell", // [quads, hips, glutes, hams, core]
  "Cable Pull Downs": "cable", // [lats, traps, biceps, core, delts, shoulders]
  "Bicep Curls": "dumbbell", // [biceps]
};

const WORKOUTS = {
  "MONDAY (LEGS)": LEGS,
  "WEDNESDAY (FRONT)": FRONT,
  "FRIDAY (BACK)": BACK,
};

const WEEKDAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export const LOCAL_STORAGE_KEY = "workout";

export function formatDate(when = new Date()) {
  return moment(when).format("YYYY-MM-DD");
}

// TODO: make this editable
export function getTodaysWorkout(todayIndex) {
  for (let delta = 0; delta < 7; delta++) {
    const prevIndex = (7 + todayIndex - delta) % 7;
    const day = WEEKDAYS[prevIndex];

    const entry = Object.entries(WORKOUTS).find(([key]) => key.startsWith(day));
    if (entry) {
      return entry;
    }
  }

  return null;
}

export function arrayRange(min, max, step) {
  let array = [];
  for (let i = min; i <= max; i += step) {
    array.push(i);
  }
  return array;
}

export function initWorkout(setWorkout) {
  const today = formatDate();
  const workouts = getLocalStorage();
  const workout = workouts[today] ?? false;

  if (workout) {
    setWorkout(workout);
  }
}

export function persistWorkout(workout) {
  const today = formatDate();
  const existing = getLocalStorage();
  const payload = { ...existing, [today]: workout }; // one workout per day

  //console.log("Persisting workout", payload);
  setLocalStorage(payload);
}

export function setLocalStorage(payload) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
}

export function eraseLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
}
