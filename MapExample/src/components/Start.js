import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//import { Card, CardSection, Input, Button, Spinner } from './common';

class Start extends Component {
  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={{
          latitude: 39.7392,
          longitude: -104.9903,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

export default Start;
