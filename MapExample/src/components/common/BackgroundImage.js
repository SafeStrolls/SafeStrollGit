import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';

export default class BackgroundImage extends Component {
  render() {
    return (
      <View>
        <Image
          source={require('./img/favicon.png')}
        />
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: 'http://www.asasamfallighetsforening.se/upload/pictures/Gatlampa.jpg' }}
        />
        <Image
          style={{ width: 66, height: 58 }}
          source={{ uri:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
        />
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);
