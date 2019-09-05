import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from '@firebase/app'; //eslint-disable-line
import '@firebase/auth'; //eslint-disable-line
import { booksFetch, fetchUser } from '../actions';
import BookDetail from '../components/BookDetail';
import SearchBar from '../components/SearchBar';

class BookListScreen extends Component {
  static navigationOptions = {
    headerLeft: <SearchBar />
  };

  componentWillMount() {
    this.props.booksFetch();
    if (this.props.user.displayName === undefined) {
      this.props.fetchUser(firebase.auth().currentUser);
    }
  }

  handlePress = (book) => {
    this.props.navigation.navigate('Book', { book });
  }

  renderBooks() {
    return this.props.books.map(book =>
      <TouchableOpacity
        key={book.date}
        delayPressIn={50}
        onPress={() => this.handlePress(book)}
      >
        <BookDetail book={book} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        {this.renderBooks()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const books = Object.keys(state.books).map((key) => {
    return state.books[key];
  });
  console.log(books);

  const { user } = state.auth;

  return { books, user };
};

export default connect(mapStateToProps, { booksFetch, fetchUser })(BookListScreen);
