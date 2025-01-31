import moment from 'moment';

export const LOCAL_STORAGE_KEY = 'workout';

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

// TODO: consider making a useLocalStorage helper

export function formatHistory(history, size = 0) {
  const entries = Object.entries(history).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateB - dateA; // most recent first
  });

  return Object.fromEntries(entries.slice(0, size || entries.length));
}

export function makeWeightOptions(weight, exercise) {
  // 135 becomes 135..225 i.e., barbell and 1..2 plates
  let [length, multiple] = [21, 5]

  if (exercise.toLowerCase().includes('dumb')) {
    // 5 becomes 5..60 e.g., options on my adjustable dumbbell (lb)
    [length, multiple] = [12, 5]
  }

  if (exercise.toLowerCase().includes('kettle')) {
    // 16 becomes 16..24 e.g., options on my adjustable kettlebell (kg)
    [length, multiple] = [5, 2]
  }

  return Array.from({ length }, (_, i) => weight + i * multiple);
}
