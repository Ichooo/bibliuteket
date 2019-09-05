import {
  BOOKS_FETCH_SUCCESS,
  BOOKS_SEARCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKS_FETCH_SUCCESS:
      return action.payload;
    case BOOKS_SEARCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
