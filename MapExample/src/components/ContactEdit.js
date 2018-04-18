import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import ContactForm from './ContactForm';
//import ContactInfo from './ContactInfo';
import { contactUpdate, contactSave, contactDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class ContactEdit extends Component {
  state = { showModal: false }
  componentWillMount() {
    _.each(this.props.contact, (value, prop) => {
      this.props.contactUpdate({ prop, value });
    });
  }

onButtonPress() {
  const { name, phone, uid } = this.props; //removed shift after phone
  console.log("uid onbuttonpress " + this.props.uid);
  this.props.contactSave({ name, phone, uid: this.props.uid });
  Actions.pop(2); //vi får ha såhär tillfälligt tills vi löser hur man
  //kommer direkt till My Network!
}

onAccept() { //denna funkar inte än... kontakten tas inte bort!
  const { name, phone, uid } = this.props;
  this.props.contactDelete({ name, phone, uid: this.props.uid });
  Actions.pop(2); //vi får ha såhär tillfälligt tills vi löser hur man
  //kommer direkt till My Network!
}

onDecline() {
  this.setState({ showModal: false });
}

  render() {
    return (
      <Card>
        <ContactForm />
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Save Changes
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
              Delete Contact
            </Button>
          </CardSection>

          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)} //lägg till NÅTSOMREFTILLKONTAKTENIFRÅGA?
            onDecline={this.onDecline.bind(this)}
          >
            Are you sure you want to delete this contact?
          </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, uid } = state.contactForm;

  return { name, phone, uid };
};

export default connect(mapStateToProps, {
  contactUpdate, contactSave, contactDelete })(ContactEdit);
