import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import moment from 'moment';
import 'moment/locale/sv';
import Card from './Card';
import CardSection from './CardSection';
import ListImage from './ListImage';

class BookDetail extends Component {
  render() {
    const { pictureUrl, title, author, price, date } = this.props.book;
    const dateFormatted = moment(date).format('YYYY-MM-DD');

    return (
      <View>
        <Card>
          <CardSection style={styles.cardSectionAllStyle}>
            <ListImage source={{ uri: pictureUrl }} />
            <CardSection style={styles.cardSectionTextStyle}>
              <Text style={styles.titleStyle}>{ title }</Text>
              <Text style={styles.authorStyle}>{ author }</Text>
              <CardSection style={styles.cardSectionBottomStyle}>
                <Text style={styles.priceStyle}>{ price } kr</Text>
                <Text style={styles.dateStyle}>{ dateFormatted }</Text>
              </CardSection>
            </CardSection>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 15
  },
  authorStyle: {
    paddingLeft: 10,
    fontSize: 10
  },
  cardSectionAllStyle: {
    flexDirection: 'row'
  },
  cardSectionBottomStyle: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    justifyContent: 'space-between',
  },
  dateStyle: {
    alignSelf: 'flex-end',
    //paddingBottom: 3,
    fontSize: 10
  },
  cardSectionTextStyle: {
    flex: 1
  },
  priceStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00C853',
    alignSelf: 'flex-end'
  }
};

export default BookDetail;
