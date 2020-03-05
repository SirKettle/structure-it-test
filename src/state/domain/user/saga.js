import { put, takeLatest, delay } from 'redux-saga/effects';
import { actions, actionTypes } from './action';
import { isValid } from './validation';

const tempGetUsers = () => {
  try {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    return users;
  } catch (error) {}
};

export function* tempStoreUser(action) {
  try {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    users.push(action.payload);
    sessionStorage.setItem('users', JSON.stringify(users));
  } catch (error) {}
}

export function* getUsers() {
  try {
    const data = tempGetUsers();
    // simulate loading
    yield delay(500);
    yield put(actions.getUsersSuccess(data));
  } catch (error) {
    yield put(actions.getUsersError(error));
  }
}

export function* addUser(action) {
  try {
    // simulate posting new record
    yield delay(150);
    const user = action.payload;
    if (isValid(user)) {
      yield put(actions.addUserSuccess(user));
    } else {
      debugger;
      throw new Error('Invalid user');
    }
  } catch (error) {
    yield put(actions.addUserError(error.message));
  }
}

export default function* watch() {
  yield takeLatest(actionTypes.getUsers, getUsers);
  yield takeLatest(actionTypes.addUser, addUser);
  yield takeLatest(actionTypes.addUserSuccess, tempStoreUser);
}
