import { combineReducers } from 'redux';
import BookReducer from './BookReducer';
import BookFormReducer from './BookFormReducer';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';

export default combineReducers({
  books: BookReducer,
  bookForm: BookFormReducer,
  auth: AuthReducer,
  profile: ProfileReducer
});
