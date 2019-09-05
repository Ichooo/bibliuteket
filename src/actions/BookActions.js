import firebase from '@firebase/app'; //eslint-disable-line
import '@firebase/auth'; //eslint-disable-line
import '@firebase/database'; //eslint-disable-line
import {
  BOOKS_FETCH_SUCCESS,
  BOOK_UPDATE,
  BOOK_CREATE,
  BOOKS_SEARCH_SUCCESS,
  SEARCH_UPDATE
} from './types';

export const booksFetch = () => {
  return (dispatch) => {
    firebase.database().ref('books').orderByChild('date')
      .on('value', snapshot => {
      const books = [];
      snapshot.forEach(child => {
        const childWithUid = { ...child.val(), uid: child.key };
        books.push(childWithUid);
      });
      books.reverse();
      dispatch({ type: BOOKS_FETCH_SUCCESS, payload: books });
    });
  };
};

export const booksSearch = (value) => {
  return (dispatch) => {
    firebase.database().ref('books').orderByChild('date')
      .once('value', snapshot => {
        const books = [];
        snapshot.forEach(child => {
          if (child.val().title.toLowerCase().includes(value.toLowerCase().trim())) {
            const childWithUid = { ...child.val(), uid: child.key };
            books.push(childWithUid);
          }
        });
        books.reverse();
        dispatch({ type: BOOKS_SEARCH_SUCCESS, payload: books });
      });
  };
};

export const searchUpdate = (searchTitle) => {
  return {
    type: SEARCH_UPDATE,
    payload: searchTitle
  };
};

export const bookUpdate = ({ prop, value }) => {
  return {
    type: BOOK_UPDATE,
    payload: { prop, value }
  };
};

export const bookCreate = ({
  author, date, description, email, location, phone, pictureUrl, price, title, navigator
}) => {
  const { currentUser } = firebase.auth();
  const name = currentUser.displayName;

  return (dispatch) => {
    firebase.database().ref('/books')
      .push({
        author,
        date,
        user: currentUser.uid,
        description,
        email,
        location,
        phone,
        pictureUrl,
        price,
        name,
        title
      })
      .then(() => {
        dispatch({ type: BOOK_CREATE });
        navigator.switchToTab({
          tabIndex: 0
        });
      });
  };
};

export const bookDelete = ({ uid }) => {
  return () => {
    firebase.database().ref(`books/${uid}`).remove();
  };
};
