import moment from 'moment';

export const LOCAL_STORAGE_KEY = 'workout';
const KETTLEBELL_WEIGHTS = [17.6, 22, 26.4, 30.8, 35.2, 39.6, 44, 52.8, 61.6];

export const buttonStyle = 'bg-blue-500 disabled:bg-gray-500 text-white font-bold p-2 rounded';

export function formatDate(when = new Date()) {
  return moment(when).format('YYYY-MM-DD');
}

export function getPreviousWorkoutSet(exercise, setIndex = 0) {
  const { history } = getLocalStorage(); // most recent first

  const today = formatDate();
  const [, prev] =
    Object.entries(history).find(([date, workout]) => date !== today && !!workout?.[exercise]) ||
    [];

  const sets = prev?.[exercise] ? prev[exercise].split(',') : [];
  // console.log({ sets, setIndex, value: sets?.[setIndex] })
  return parseSet(sets[setIndex]);
}

export function parseSet(str) {
  if (!str) {
    return { weight: 0, reps: 0 };
  }

  const [weight, reps] = str.split('x');
  return { weight: parseFloat(weight), reps: parseInt(reps) };
}

export function formatSet({ weight, reps }) {
  return `${weight}x${reps}`;
}

export function arrayRange(min, max, step) {
  let array = [];
  for (let i = min; i <= max; i += step) {
    array.push(i);
  }
  return array;
}

export function setLocalStorage(payload) {
  if (!payload || !('workouts' in payload) || !('history' in payload)) {
    return;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
}

export function eraseLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getLocalStorage(size = 0) {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (!data) {
    return { workouts: {}, history: {} };
  }

  const { workouts, history } = data;

  return {
    workouts,
    history: formatHistory(history, size),
  };
}

export function formatHistory(history, size = 0) {
  const entries = Object.entries(history).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateB - dateA; // most recent first
  });

  return Object.fromEntries(entries.slice(0, size || entries.length));
}

export function makeWeightOptions(weight) {
  // whole numbers are not kettlebells, e.g., barbell, dumbbell, cable
  if (Number.isInteger(weight)) {
    // deadlifts: 135 becomes 135..225 i.e., one plate to two plates
    const length = 21;
    const multiple = 5;

    return Array.from({ length }, (_, i) => weight + i * multiple);
  } else {
    const length = 5;

    // default to the first N weights (not found is -1) and stop at the last N weights
    const currentIndex = Math.min(
      Math.max(KETTLEBELL_WEIGHTS.indexOf(weight), 0),
      KETTLEBELL_WEIGHTS.length - length
    );

    return KETTLEBELL_WEIGHTS.slice(currentIndex, currentIndex + length);
  }
}
