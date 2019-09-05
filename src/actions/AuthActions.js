import firebase from '@firebase/app'; //eslint-disable-line
import '@firebase/auth'; //eslint-disable-line
import {
  FETCH_USER,
  USER_UPDATE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER
} from './types';

export const fetchUser = (user) => {
  return {
    type: FETCH_USER,
    payload: user
  };
};

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

export const loginUser = ({ liuid, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const email = `${liuid}@student.liu.se`;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => loginUserFail(error.message, dispatch));
  };
};

export const registerUser = ({ name, liuid, password }) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });
    const email = `${liuid}@student.liu.se`;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.updateProfile({
          displayName: name
        })
        .then(() => {
          user.sendEmailVerification()
          .then(() => console.log('Sent email confirmation'))
          .catch(error => console.log(error));
        })
        .then(() => {
          registerUserSuccess(dispatch, user);
        });
      })
      .catch(error => registerUserFail(error.message, dispatch));
  };
};

const loginUserFail = (error, dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const registerUserFail = (error, dispatch) => {
  dispatch({
    type: REGISTER_USER_FAIL,
    payload: error
  });
};

const registerUserSuccess = (dispatch, user) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user
  });
};
