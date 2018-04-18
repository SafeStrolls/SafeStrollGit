import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
         PASSWORD_CHANGED,
         LOGIN_USER_SUCCESS,
         LOGIN_USER_FAIL,
         LOGIN_USER,
         SIGN_UP_USER,
         SIGN_UP_SUCCESS
        } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch((error) => {
      console.log(error);

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
    });
  };
};

export const signUpUser = ({ email, password }) => {
  // firebase.auth().languageCode = 'it';
  // const appVerifier = window.recaptchaVerifier;

  return (dispatch) => {
    dispatch({ type: SIGN_UP_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signUpSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));

    // firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    //   .then(user => signUpSuccess(dispatch, user))
      // .then(() => (confirmationResult) {
      //   SMS sent. Prompt user to type the code from the message, then sign the
      //   user in with confirmationResult.confirm(code).
      //   window.confirmationResult = confirmationResult;
      //})
      // .catch(() => loginUserFail(dispatch));
      // // .catch(function (error)
      //   Error; SMS not sent
      //   ...
      // });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  //from here we navigate the user to screen after login
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main(); // byter till contactList scene
};

const signUpSuccess = (dispatch, user) => {
  dispatch({
    type: SIGN_UP_SUCCESS,
    payload: user
  });
  Actions.auth();
};
