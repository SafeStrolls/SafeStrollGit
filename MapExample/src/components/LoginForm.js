import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signUpUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  signUpButton() {
    // if (this.props.loading) {
    //   return <Spinner size="large" />;
    // }
    return (
      <Button onPress={() => Actions.signUp()}>
        Sign Up
      </Button>
    );
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Card>
        <View style={{ alignItems: 'center', opacity: 0.5, borderRadius: 15}}>
        <Image source={{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1352737-200.png'}}
                style={{width: 200, height: 170}} />
        </View>
        <CardSection style={styles.cardSectionStyle}>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection style={styles.cardSectionStyle}>
          <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          />
        </CardSection>

          {this.renderError()}

        <CardSection style={{backgroundColor: 'none', marginTop:10}}>
          {this.renderButton()}
        </CardSection>

        <CardSection style={{borderRadius: 15, marginTop: 20, padding: 10}}>
          <View>
            <Text style={styles.textStyle}>
              Do you not have an account yet?
            </Text>
          </View>
          {this.signUpButton()}
        </CardSection>

    </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  textStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    paddingTop: 10
  },
  cardSectionStyle: {
    borderRadius: 15
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
  };

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, loginUser, signUpUser
 })(LoginForm);
