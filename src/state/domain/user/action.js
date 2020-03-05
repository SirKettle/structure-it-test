export const actionTypes = {
  getUsers: 'get/users/request',
  getUsersSuccess: 'get/users/success',
  getUsersError: 'get/users/error',
  addUser: 'add/user/request',
  addUserSuccess: 'add/user/success',
  addUserError: 'add/user/error',
};

export const actions = {
  getUsers: () => ({
    type: actionTypes.getUsers,
  }),
  getUsersSuccess: data => ({
    type: actionTypes.getUsersSuccess,
    payload: data,
  }),
  getUsersError: err => ({
    type: actionTypes.getUsersError,
    error: err,
  }),
  addUser: (user) => ({
    type: actionTypes.addUser,
    payload: user,
  }),
  addUserSuccess: data => ({
    type: actionTypes.addUserSuccess,
    payload: data,
  }),
  addUserError: err => ({
    type: actionTypes.addUserError,
    error: err,
  }),
};
