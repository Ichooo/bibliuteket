import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bookUpdate } from '../actions/BookActions';
import CardSection from './CardSection';

class ImageUploader extends Component {
  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;
      const storage = firebase.storage();
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = storage.ref('images').child(`${sessionId}`);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          this.props.bookUpdate({ prop: 'pictureUrl', value: '' });
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
      });
    });
  }

  pickImage() {
    //this.props.bookUpdate({ prop: 'pictureUrl', value: '' });
    ImagePicker.launchImageLibrary({ maxWidth: 500 }, response => {
      this.uploadImage(response.uri)
        .then(url => this.props.bookUpdate({ prop: 'pictureUrl', value: url }))
        .catch(error => console.log(error));
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          (() => {
            switch (this.props.pictureUrl) {
              case null:
                return (
                  <TouchableOpacity onPress={() => this.pickImage()}>
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={require('../images/uploadButton.png')} //eslint-disable-line
                    />
                  </TouchableOpacity>
                );
              case '':
                return (
                  <CardSection>
                    <ActivityIndicator />
                  </CardSection>
                );
              default:
                return (
                  <View>
                    <ImageBackground
                      source={{ uri: this.props.pictureUrl }}
                      style={styles.image}
                    >
                      <Icon
                        onPress={() => this.props.bookUpdate({ prop: 'pictureUrl', value: null })}
                        name="close"
                        size={30}
                        color="white"
                        style={{ alignSelf: 'flex-end', backgroundColor: '#e53935' }}
                      />
                    </ImageBackground>
                  </View>
                );
            }
          })()
        }

      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  image: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#373737'
  },
  upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
};

const mapStateToProps = (state) => {
  const { pictureUrl } = state.bookForm;

  return { pictureUrl };
};

export default connect(mapStateToProps, { bookUpdate })(ImageUploader);
