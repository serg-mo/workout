import moment from "moment";

// TODO: make every exercise have its own weight options
const kettlebellWeights = [
  8.8, 13.2, 17.6, 22, 26.4, 30.8, 35.2, 39.6, 44, 48.4, 52.8,
];

const LEGS = {
  Squat: arrayRange(135, 185, 5), // quads, hams, glutes
  "Kettlebell Lunges": kettlebellWeights, // glutes, hams, quads, calves
  Calves: arrayRange(200, 250, 5), // calves
};

// push: chest, shoulders, and triceps
const FRONT = {
  "Bench Press": arrayRange(135, 185, 5), // pecs, delts, triceps, biceps, serratus
  "Overhead Press": arrayRange(45, 135, 10), // pecs, delts, triceps, traps
  "Bicep Curls": arrayRange(20, 45, 5), // biceps
  Abs: arrayRange(200, 250, 5),
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

export function getTodaysWorkout() {
  const todayIndex = new Date().getDay(); // 0 = Sunday .. 6 = Saturday

  for (let delta = 0; delta < 7; delta++) {
    const prevIndex = (7 + todayIndex - delta) % 7;
    const day = WEEKDAYS[prevIndex];

    const workout = Object.keys(WORKOUTS).find((key) => key.startsWith(day));
    if (workout) {
      return workout;
    }
  }

  return null;
}

export function formatSets(sets) {
  return sets.map(({ weight, reps }) => `${weight}x${reps}`).join(", ");
}

export function formatWorkout([exercise, sets]) {
  return `${exercise}: ${formatSets(sets)}`;
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
  const workout = workouts?.[today];

  // load today's saved workout after page refresh, if available
  if (workout) {
    setWorkout(workout);
  }
}

export function persistWorkout(workout) {
  const today = formatDate();
  const existing = getLocalStorage();

  // NOTE: one workout per day
  // TODO: sort by date here
  const payload = { ...existing, [today]: workout };

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
