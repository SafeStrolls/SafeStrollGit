import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { logoutUser } from '../actions';

class MyProfile extends Component {
    //const user = firebase.auth().currentUser;

    onLogoutButtonPress() {
      const { email, password } = this.props;

      this.props.logoutUser({ email, password });
    }

    logoutButton() {
      if (this.props.loading) {
        return <Spinner size="large" />;
      }

      return (
        <Button onPress={this.onLogoutButtonPress.bind(this)}>
          Log out
        </Button>
      );
    }

  render() {
    const user = firebase.auth().currentUser;
    const email = user.email;
    // const password = user.password;

        return (
          <Card>
            <CardSection style={{ height: 50, borderRadius: 15 }}>
              <Text style={styles.titleStyle}>
                Email:
              </Text>
              <Text style={styles.emailStyle}>
                {email}
              </Text>
            </CardSection>
            <CardSection style={{ height: 50, borderRadius: 15 }}>
              <Text style={styles.titleStyle}>
                Password: ******
              </Text>
            </CardSection>

            <CardSection style={{ backgroundColor: 'transparent' }}>
              {this.logoutButton()}
            </CardSection>
          </Card>
        );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    padding: 10
  },
  emailStyle: {
    fontSize: 18,
    padding: 10,
    color: '#007aff'
  }
};

const mapStateToProps = () => {
  // console.log('auth:');
  // console.log({ auth });
  const { email, password, error } = '';
  const { loading } = false;

  return { email, password, error, loading };
  };

export default connect(mapStateToProps,
  { logoutUser })(MyProfile);

//export default MyProfile;
