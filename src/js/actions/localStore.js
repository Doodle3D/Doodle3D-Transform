import * as localStore from 'src/js/services/localStore.js';

export const LOCAL_STORE_READ = 'LOCAL_STORE_READ';
export const LOCAL_STORE_LEAVE_TRACE = 'LOCAL_STORE_LEAVE_TRACE';
export const ADD_PAYMENT = 'ADD_PAYMENT';

export function read() {
  return { type: LOCAL_STORE_READ, data: localStore.read() };
}
export function leaveTrace() {
  return { type: LOCAL_STORE_LEAVE_TRACE };
}
export function addPayment(payments) {
  return { type: ADD_PAYMENT, payments };
}
