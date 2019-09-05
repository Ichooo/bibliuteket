import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import firebase from '@firebase/app'; //eslint-disable-line
import '@firebase/auth'; //eslint-disable-line
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import { bookDelete } from '../actions';

class BookScreen extends Component {
  renderDeleteButton() {
    const { currentUser } = firebase.auth();
    const { uid, user } = this.props.navigation.getParam('book');
    if (currentUser && currentUser.uid === user) {
      return (
        <Button
          raised
          buttonStyle={{ backgroundColor: '#F44336', marginBottom: 15 }}
          textStyle={{ textAlign: 'center' }}
          backgroundColor='red'
          title={'Ta bort'}
          onPress={() => this.props.bookDelete({ uid })}
        />
      );
    }
  }

  render() {
    const {
      author,
      date,
      description,
      email,
      name,
      phone,
      pictureUrl,
      price,
      title,
    } = this.props.navigation.getParam('book');
    const formattedDate = moment(date).fromNow();

    return (
      <ScrollView>
        <Card>
        <Image style={styles.imageStyle} source={{ uri: pictureUrl }} />
         <CardSection>
           <Text style={styles.headingStyle}>
             { title }
           </Text>
           <Text style={styles.subHeadingStyle}>
             { author }
           </Text>
         </CardSection>
         <CardSection style={styles.rowCardStyle}>
           <View style={{ flexDirection: 'row' }}>
             <Icon
              name="location-on"
              size={20} color="#373737"
              style={[styles.iconStyle, { marginTop: 5 }]}
             />
             <Text style={[styles.subHeadingStyle, { alignSelf: 'center' }]}>
               TNM093
             </Text>
           </View>
           <Text style={styles.priceStyle}>
              { price } kr
           </Text>
         </CardSection>
        </Card>
        <Card>
         <CardSection>
           <Text style={styles.descriptionHeadingStyle}>Beskrivning</Text>
           <Text style={styles.descriptionTextStyle}>
             { description }
           </Text>
         </CardSection>
        </Card>
        <Card>
         <CardSection>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="person" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { name }
             </Text>
           </View>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="email" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { email }
             </Text>
           </View>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="phone" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { phone }
             </Text>
           </View>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="access-time" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { formattedDate }
             </Text>
           </View>
         </CardSection>
         {this.renderDeleteButton()}
        </Card>
     </ScrollView>
    );
  }
}

const styles = {
  headingStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  subHeadingStyle: {
    fontSize: 15,
    color: '#373737'
  },
  priceStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00C853',
  },
  rowCardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
    backgroundColor: '#373737',
  },
  descriptionHeadingStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3
  },
  descriptionTextStyle: {
    fontSize: 14,
    color: '#373737'
  },
  infoStyle: {
    fontSize: 14,
    color: '#373737',
    marginBottom: 3,
  },
  iconStyle: {
    marginRight: 8
  }
};

export default connect(null, { bookDelete })(BookScreen);
