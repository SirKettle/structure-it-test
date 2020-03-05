import { LOADING_STATUS } from '../../loadingStatus';
import { actionTypes } from './action';

const initialState = {
  data: [],
  loading: LOADING_STATUS.INITIAL,
  error: void 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getUsers: {
      return {
        ...initialState,
        loading: LOADING_STATUS.PENDING,
      };
    }
    case actionTypes.getUsersSuccess: {
      return {
        ...state,
        loading: LOADING_STATUS.SUCCESS,
        data: action.payload,
      };
    }
    case actionTypes.getUsersError: {
      return {
        ...state,
        loading: LOADING_STATUS.ERROR,
        error: action.payload,
      };
    }
    case actionTypes.addUser: {
      return {
        ...state,
        loading: LOADING_STATUS.PENDING,
      };
    }
    case actionTypes.addUserSuccess: {
      return {
        ...state,
        loading: LOADING_STATUS.SUCCESS,
        data: [...state.data, action.payload],
      };
    }
    case actionTypes.addUserError: {
      return {
        ...state,
        loading: LOADING_STATUS.ERROR,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
