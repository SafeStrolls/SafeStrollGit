import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ContactList from './components/ContactList';
import ContactCreate from './components/ContactCreate';
import ContactEdit from './components/ContactEdit';
import ContactInfo from './components/ContactInfo';
import SignUp from './components/SignUp';
import Start from './components/Start';
import MyProfile from './components/MyProfile';
import ProfileEdit from './components/ProfileEdit';
import Directions from './components/Directions';

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
            onRight={() => Actions.contactEdit()}
            rightTitle="Edit"

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
            <Scene
              key="direction"
              component={Directions}
              title="Get direction"
            />
            <Scene
              key="myProfile"
              component={MyProfile}
              title="My profile"
              onRight={() => Actions.profileEdit()}
              rightTitle="Edit password"
            />
            <Scene
              key="profileEdit"
              component={ProfileEdit}
              title="Edit my profile"
            />

          </Scene>


        </Scene>
      </Router>


  );
};

export default RouterComponent;
