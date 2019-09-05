import {
  FETCH_USER,
  USER_UPDATE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  liuid: '',
  password: '',
  user: {},
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload };
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case REGISTER_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
    default:
      return state;
  }
};
