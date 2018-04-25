import _ from 'lodash';
import React, { Component } from 'react';
//import getDirections from 'react-native-google-maps-directions';
//import RNGooglePlaces from 'react-native-google-places';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import {
  Text,
  ListView
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Input } from './common';
import { contactsFetch } from '../actions';
import ListItemPosition from './ListItemPosition';

class Directions extends Component {

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

  createDataSource({ contacts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
  }


 renderRow(contact) {
   return (
     <ListItemPosition
       contact={contact}
     />
   );
 }

  render() {
    return (

      <Card>
        <CardSection>
          <Input
            secureTextEntry
            label="From"
            placeholder="Hi, where from?"
            //onChangeText={this.handleInput.bind(this, 'WhereFrom')}
            //value={this.props.direction}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="To"
            placeholder="Where to?"
            //onChangeText={this.handleInput.bind(this, 'WhereTo')}
            //value={this.props.direction}
          />
        </CardSection>

        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Button onPress={() => Actions.goingHome()}>
            Start going home
          </Button>
        </CardSection>

        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.textStyle}>
            Choose contacts who will see your position:
          </Text>
        </CardSection>

        <CardSection>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        </CardSection>
      </Card>

    );
  }
}
const styles = {
  textStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    paddingTop: 10
  }
};
const mapStateToProps = (state) => {
  // const inputData = _.map(state.inputData, (key, value) => {
  //   return { ...key, value };
  // });
  //   return { inputData };
  const contacts = _.map(state.contacts, (val, uid) => {
    return { ...val, uid };
  });

  return { contacts };
};

export default connect(mapStateToProps, { contactsFetch })(Directions);
