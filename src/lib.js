import moment from 'moment';

export const LOCAL_STORAGE_KEY = 'workout';
const kettlebellWeights = [9, 13, 26, 35, 44, 53, 62, 70, 80];

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
  if (Number.isInteger(weight)) {
    return Array.from({ length: 10 }, (_, i) => weight + i * 5); // 10 increments of 5
  } else {
    const currentIndex = kettlebellWeights.indexOf(Math.round(weight));
    if (currentIndex === -1 || currentIndex >= kettlebellWeights.length - 3) {
      return kettlebellWeights
    }

    // next 3 kettlebell weights
    return kettlebellWeights.slice(currentIndex, currentIndex + 3);
  }
}
