import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ContactList from './components/ContactList';
import ContactCreate from './components/ContactCreate';
import ContactEdit from './components/ContactEdit';
import ContactInfo from './components/ContactInfo';
import SignUp from './components/SignUp';
import Start from './components/Start';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>

        <Scene key="auth">
          <Scene
            key="login"
            component={LoginForm}
            title="Welcome to SafeStroll!"
          />
          <Scene
            key="signUp"
            component={SignUp}
            title="Sign up"
          />
        </Scene>

        <Scene key="main">
          <Scene
            rightTitle="Add"
            onRight={() => Actions.contactCreate()}
            key="contactList"
            component={ContactList}
            title="My network"
            initial
          />
          <Scene
            key="contactCreate"
            component={ContactCreate}
            title="Create contact"
          />
          <Scene
            key="contactInfo"
            component={ContactInfo}
            title="Contact info"
            rightTitle="Edit"
            onRight={() => Actions.contactEdit()}

          />
            <Scene
              key="contactEdit"
              component={ContactEdit}
              title="Edit Contact"

            />

            <Scene
                    key="start"
                    component={Start}
                    title="Go home"
            />

          </Scene>


        </Scene>
      </Router>


  );
};

export default RouterComponent;
