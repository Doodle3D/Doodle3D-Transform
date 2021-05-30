export const START = 'START_BLOCKING_SPINNER';
export const STOP = 'STOP_BLOCKING_SPINNER';

export function start() {
  return { type: START };
}
export function stop() {
  return { type: STOP };
}
