import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import firebase from '@firebase/app'; //eslint-disable-line
import '@firebase/auth'; //eslint-disable-line

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(user => {
      if (user) this.props.navigation.navigate('App');
      else this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AuthLoadingScreen;
