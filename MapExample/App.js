import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
// import LoginForm from './src/components/LoginForm';
import Router from './src/Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAyliELgXeuVzjCet4TZJmELmvc9B-JqvQ',
      authDomain: 'safestroll-ccf3c.firebaseapp.com',
      databaseURL: 'https://safestroll-ccf3c.firebaseio.com',
      projectId: 'safestroll-ccf3c',
      storageBucket: 'safestroll-ccf3c.appspot.com',
      messagingSenderId: '125161140529'
    };

firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
