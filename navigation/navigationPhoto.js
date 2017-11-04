import React from 'react';
import { StackNavigator } from 'react-navigation';

import { View, Text, Button } from 'react-native';

import ValidPicture from '../composent/photo/confirm'
import BadInstagramCloneApp from '../composent/photo/Photo'

const PhotoNavigator = StackNavigator({
  Photo: {
    screen: BadInstagramCloneApp,
    navigationOptions: {
      headerTitle: 'Prenez une photo',
    },
  },
  Confirmation: {
    screen: ValidPicture,
    navigationOptions: {
      headerTitle: 'Valider votre Photo',
    },
  }
});

export default PhotoNavigator;