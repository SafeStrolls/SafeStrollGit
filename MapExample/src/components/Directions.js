import _ from 'lodash';
import React, { Component } from 'react';
import getDirections from 'react-native-google-maps-directions';
import RNGooglePlaces from 'react-native-google-places';

import { connect } from 'react-redux';
import { Text, ListView, View, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button } from './common';
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

 //  handleGetDirections = () => {
 //   const data = {
 //      source: {
 //       latitude: -33.8356372,
 //       longitude: 18.6947617
 //     },
 //     destination: {
 //       latitude: -33.8600024,
 //       longitude: 18.697459
 //     },
 //     params: [
 //       {
 //         key: 'travelmode',
 //         value: 'driving'        // may be "walking", "bicycling" or "transit" as well
 //       },
 //       {
 //         key: 'dir_action',
 //         value: 'navigate'
 //         // this instantly initializes navigation using the given travel mode
 //       }
 //     ]
 //   };
 //
 //   getDirections(data);
 // }
// openSearchModal() {
//   RNGooglePlaces.openPlacePickerModal({
//     latitude: 53.544389,
//     longitude: -113.490927,
//     radius: 0.01 // 10 meters
//   })
//   .then((place) => {
//     console.log(place);
//   })
//   .catch(error => console.log(error.message));
// }
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
            onChangeText={() => Actions.address()}
            value={this.props.direction}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="To"
            placeholder="Where to?"
            onChangeText={() => Actions.address()}
            value={this.props.direction}
          />
        </CardSection>

        <CardSection>
          <Button onPress={() => Actions.goingHome()}>
            Start going home
          </Button>
        </CardSection>

        <CardSection>
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
const mapStateToProps = state => {
  const contacts = _.map(state.contacts, (val, uid) => {
    return { ...val, uid };
  });

  return { contacts };
};

export default connect(mapStateToProps, { contactsFetch })(Directions);

//<CardSection>
  // <View>
  //   <TextInput
  //     placeholder='Where to?'
  //     onChangeText={this.handleLocationInput}
  //     value={this.state.locationInput}
  //     onSubmitEdiiting={this.handleSubmit.bind(this)}
  //   />
  //   <View>
  //     <TouchableOpacity
  //       onPress={this.callout.bind(this)}
  //     />
  //     </View>
  //
  // </View>
//</CardSection>

// <CardSection>
//   <View>
//     <TouchableOpacity
//       onPress={() => this.openSearchModal()}
//     >
//       <Text>Open Place Picker</Text>
//     </TouchableOpacity>
//   </View>
// </CardSection>
