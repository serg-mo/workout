import moment from 'moment';

export const LOCAL_STORAGE_KEY = 'workout';

// max does not matter
export const MIN_WORKOUTS = 2;
export const MIN_EXERCISES = 3;

export function isValidWorkouts(workouts) {
  // expected shape example: weekday > exercise > weight
  const isValidWorkouts =
    workouts &&
    Object.keys(workouts).length >= MIN_WORKOUTS &&
    Object.keys(workouts).every((name) => isNaN(Number(name)));

  const isValidExercises =
    workouts &&
    Object.values(workouts).every(
      (exercises) =>
        Object.keys(exercises).length >= MIN_EXERCISES &&
        Object.values(exercises).every((weight) => !isNaN(Number(weight)))
    );

  return isValidWorkouts && isValidExercises;
}

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

// TODO: instead of size, take a startDate
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

export function makeWeightOptions(name) {
  // default to barbell, two plates max, empty bar min
  let [length, multiple, min] = [21, 5, 45];

  if (name.toLowerCase().includes('dumb')) {
    // 5..60 are the options on my REP adjustable dumbbell (lb)
    // front/lateral raises are light, just a single 2.5lb plate
    [length, multiple, min] = name.toLowerCase().includes('raise') ? [3, 2.5, 5] : [12, 5, 5];
  }

  if (name.toLowerCase().includes('kettle')) {
    // 8-16 and 16-24 are the options on my REP adjustable kettlebell (kg)
    [length, multiple, min] = [9, 2, 8];
  }

  // console.log({ name, length, multiple })
  return Array.from({ length }, (_, i) => min + (i * multiple));
}
