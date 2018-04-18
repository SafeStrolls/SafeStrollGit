import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Card, CardSection } from './common';

class MyProfile extends Component {
    //const user = firebase.auth().currentUser;

  render() {
    const user = firebase.auth().currentUser;
    const email = user.email;

    return (
      <Card>
        <CardSection>
          <Text style={styles.titleStyle}>
            email:
          </Text>
          <Text style={styles.emailStyle}>
            {email}
          </Text>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  emailStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: '#007aff'
  }
};

export default MyProfile;
