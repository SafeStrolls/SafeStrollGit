import React from 'react';
//import { Text } from 'react-native';
import { Scene, Router, Actions, TabIcon } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ContactList from './components/ContactList';
import ContactCreate from './components/ContactCreate';
import ContactEdit from './components/ContactEdit';
import ContactInfo from './components/ContactInfo';
import SignUp from './components/SignUp';
import Start from './components/Start';
import MyProfile from './components/MyProfile';
import ProfileEdit from './components/ProfileEdit';


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

        <Scene key="main" hideNavBar>

          <Scene
            key="mainTabbar"
            tabs
            tabBarStyle={{ backgroundColor: '#252579',
                           //flex: 1,
                           borderColor: 'black',
                           padding: 10 }}
          >

          <Scene
            key="startTab"
            title="Start"
            icon={TabIcon}
          >
            <Scene
              key="startPage"
              component={Start}
            />

          </Scene>

            <Scene
              key="networkTab"
              title="My Network"
              icon={TabIcon}
            >

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
              hideTabBar
            />
            <Scene
              key="contactInfo"
              component={ContactInfo}
              title="Contact info"
              onRight={() => Actions.contactEdit()}
              rightTitle="Edit"
              hideTabBar

            />
              <Scene
                key="contactEdit"
                component={ContactEdit}
                title="Edit Contact"
                hideTabBar
              />

              <Scene
                      key="start"
                      component={Start}
                      title="Go home"
              />

            </Scene>

            <Scene
              key="myProfile"
              title="My Profile"
              icon={TabIcon}
            >
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
                    hideTabBar
                  />

            </Scene>

            </Scene>

          </Scene>


        </Scene>
      </Router>


  );
};

export default RouterComponent;
