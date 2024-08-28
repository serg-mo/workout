import moment from 'moment';

export const LOCAL_STORAGE_KEY = 'workout';

export function formatDate(when = new Date()) {
  return moment(when).format('YYYY-MM-DD');
}

// TODO: consider just having an array of numbers that I parse in pairs (to save space)

export function parseSet(str) {
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
  // TODO: if (!payload || !("workouts" in payload) || !("history" in payload)) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
}

export function eraseLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getLocalStorage(size = 0) {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!data || !('workouts' in data) || !('history' in data)) {
    return { workouts: {}, history: {} };
  }

  const { workouts, history } = data;
  const entries = Object.entries(history); // [date, workouts][]

  // TODO: consider sorting on export, not read
  entries.sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateB - dateA; // most recent first
  });

  return {
    workouts,
    history: Object.fromEntries(entries.slice(0, size || entries.length)),
  };
}
