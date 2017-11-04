/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RootNavigator from './navigation/navigation'


export default class App extends React.Component {

  render() {

    return (<RootNavigator/>)
    
  }
}
