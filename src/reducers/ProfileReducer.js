import {
  BOOKS_PROFILE_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  profileBooks: []
};

export default (state = INITIAL_STATE, action) => {
  const profileBooks = action.payload;
  switch (action.type) {
    case BOOKS_PROFILE_FETCH_SUCCESS:
      return { ...state, profileBooks };
    default:
      return state;
  }
};
