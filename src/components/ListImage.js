//import libraries
import React from 'react';
import { Image } from 'react-native';

//Make Component
const ListImage = (props) => {
  const { imageStyle } = styles;

  return (
    <Image
      style={imageStyle}
      source={props.source}
    />
  );
};

//Style
const styles = {
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 5
  }
};

//Export Component
export default ListImage;
