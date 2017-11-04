import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import { View, Text, Button, StyleSheet } from 'react-native';


import HomeList from '../composent/homeList'
import mainPhoto from '../composent/photo/main'
//import ValidPicture from '../composent/confirm'
//import BadInstagramCloneApp from '../composent/Photo'

const styles = StyleSheet.create({
  text: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={styles.text}>Bienvenu dans l'app de Pierre-Alexis Deville et Nathan Janeczko</Text>
    <Button
      onPress={() => navigation.navigate('DrawerToggle')}
      title="Go to details"
    />
  </View>
);

const RootNavigator = DrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Details: {
    screen: HomeList,
  },
  Photo: {
    screen: mainPhoto,
    navigationOptions: {
      headerTitle: 'Photo',
    },
  },
});

export default RootNavigator;