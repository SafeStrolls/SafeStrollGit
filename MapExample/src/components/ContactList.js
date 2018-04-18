import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListView } from 'react-native';
import { contactsFetch } from '../actions';
import { Card, CardSection, Button } from './common';
import ListItem from './ListItem';

class ContactList extends Component {
  componentWillMount() {
    this.props.contactsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  startButton() {
    return (
      <Button onPress={() => Actions.start()}>
        Start
      </Button>
    );
  }
  myProfileButton() {
    return (
      <Button onPress={() => Actions.myProfile()}>
        My Profile
      </Button>
    );
  }

  formatData(data) {
    // We're sorting by alphabetically so we need the alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      // Get the character we're currently looking for
      const currentChar = alphabet[sectionId];

      // Get users whose first name starts with the current letter
      const users = data.filter((contact) => contact.name.toUpperCase().indexOf(currentChar) === 0);

      // If there are any users who have a first name starting with the current letter then we'll
      // add a new section otherwise we just skip over it
      if (users.length > 0) {
        // Add a section id to our array so the listview knows that we've got a new section
        sectionIds.push(sectionId);

        // Store any data we would want to display in the section header.
        // In our case we want to show
        // the current character
        dataBlob[sectionId] = { character: currentChar };

        // Setup a new array that we can store the row ids for this section
        rowIds.push([]);

        // Loop over the valid users for this section
        for (let i = 0; i < users.length; i++) {
          // Create a unique row id for the data blob that the listview can use for reference
          const rowId = `${sectionId}:${i}`;

          // Push the row id to the row ids array. This is what listview will reference to pull
          // data from our data blob
          rowIds[rowIds.length - 1].push(rowId);

          // Store the data we care about for this row
          dataBlob[rowId] = users[i];
        }
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }
  createDataSource({ contacts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
  }
  renderRow(contact) {
    return <ListItem contact={contact} />;
  }

  render() {
    return (
      <Card>
      <CardSection style={styles.container}>
          <Input
            //style={input}
            label="Search"
            placeholder="Search..."
            onChangeText={(text) => console.log('searching for ', text)}
            value={this.props.search}
          />
      </CardSection>
        <CardSection>
            <ListView
                  enableEmptySections
                  dataSource={this.dataSource}
                  renderRow={this.renderRow}
            />
        </CardSection>

        <CardSection>
            {this.startButton()}
        </CardSection>
        <CardSection>
            {this.myProfileButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#C1C1C1'
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  }

});

const mapStateToProps = state => {
  const contacts = _.map(state.contacts, (val, uid) => {
    return { ...val, uid };
  });

  return { contacts };
};

export default connect(mapStateToProps, { contactsFetch })(ContactList);
