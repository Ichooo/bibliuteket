import firebase from '@firebase/app'; //eslint-disable-line
import '@firebase/auth'; //eslint-disable-line
import '@firebase/database'; //eslint-disable-line
import {
  BOOKS_PROFILE_FETCH_SUCCESS
} from './types';

export const profileBooksFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref('books').orderByChild('user').equalTo(null)
      .on('value', snapshot => {
        const profileBooks = [];
        snapshot.forEach(child => {
          const childWithUid = { ...child.val(), uid: child.key };
          profileBooks.push(childWithUid);
        });
        profileBooks.reverse();
        dispatch({ type: BOOKS_PROFILE_FETCH_SUCCESS, payload: profileBooks });
      });
  };
};
