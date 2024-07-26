import moment from "moment";

export const LOCAL_STORAGE_KEY = "workout";

export function formatDate(when = new Date()) {
  return moment(when).format("YYYY-MM-DD");
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

export function computeMinMax(arr, prop) {
  const values = arr.map((item) => Number(item[prop]));

  const min = Math.min(...values);
  const max = Math.max(...values);

  return { min, max };
}

export function filterArrayByRange(arr, { min, max }, jitter = 0) {
  const newMin = jitter ? min * (1 - jitter) : min;
  const newMax = jitter ? max * (1 + jitter) : max;

  console.log({ min, newMin, max, newMax, jitter });
  return arr.filter((value) => value >= newMin && value <= newMax);
}
