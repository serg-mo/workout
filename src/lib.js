import moment from "moment";

const WORKOUTS = {
  "MONDAY (LEGS)": [
    "Squat (17)",
    "Cossack squats",
    "Leg extensions (Hold 10 sec)",
    "Tricep cable",
  ],
  "WEDNESDAY (FRONT)": ["Bench Press", "Overhead Press", "Dips", "Cable rows"],
  "FRIDAY (BACK)": ["Deadlift", "Pull-ups", "Kettlebell swings", "Bicep curls"],
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

export function getWorkout(todayIndex) {
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
    console.log("Initializing current workout from local storage");
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
