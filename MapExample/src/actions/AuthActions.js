import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
         PASSWORD_CHANGED,
         LOGIN_USER_SUCCESS,
         LOGOUT_USER_SUCCESS,
         LOGIN_USER_FAIL,
         LOGIN_USER,
         LOGOUT_USER,
         SIGN_UP_USER,
         SIGN_UP_SUCCESS,
         PROFILE_UPDATE,
         PROFILE_SAVE_SUCCESS
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
export const profileUpdate = ({ prop, value }) => {
  return {
    type: PROFILE_UPDATE,
    payload: { prop, value }
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

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });

  firebase.auth().signOut()
    .then(user => logoutSuccess(dispatch, user)
    // .catch((error) => {
    //   console.log(error);
    // })
  );
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
export const profileSave = ({ email, password }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    //const newEmail = currentUser.updateEmail(email)
    const newPassword = currentUser.updatePassword(password)
      .then(() => {
        loginUser({ email, newPassword });
        dispatch({ type: PROFILE_SAVE_SUCCESS });
        Actions.pop();
      })
      .catch((error) => {
        console.log(error);
      });
      //Actions.myProfile();
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

const logoutSuccess = (dispatch, user) => {
  dispatch({
    type: LOGOUT_USER_SUCCESS,
    payload: user
  });
  Actions.auth();
};

const signUpSuccess = (dispatch, user) => {
  dispatch({
    type: SIGN_UP_SUCCESS,
    payload: user
  });
  Actions.auth();
};
