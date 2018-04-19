import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ListView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//import { getDirections, MapViewDirections } from 'react-native-google-maps-directions';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Card, CardSection } from './common';
import { contactsFetch } from '../actions';
import ListItem from './ListItem';
//import Directions from './Directions';
//import ListItemPosition './ListItemPosition';

class GoingHome extends Component {
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
    // if (contact.checked) {
        return (
        <ListItem
          contact={contact}
        />
        );
      //}
  }

  render() {
    // const GOOGLE_MAPS_APIKEY = 'AIzaSyCwHlnSMUxkXsqrMHrzX0KnAlJ-Z6tORlc';
    //
    // const coordinates = [
    //   {
    //     latitude: 39.7392,
    //     longitude: -104.9903,
    //   },
    //   {
    //     latitude: 39.7392,
    //     longitude: -104.9903,
    //   },
    // ];
    return (
      <Card>

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.container}
          />
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

const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '100%',
  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
});
const mapStateToProps = state => {
  const contacts = _.map(state.contacts, (val, uid) => {
    return { ...val, uid };
  });

  return { contacts };
};

export default connect(mapStateToProps, { contactsFetch })(GoingHome);

//region={this.state.locationCoordinates}
//onRegionChangeComplete={this.handleLocationChange}
//zoomEnabled
//scrollEnabled
// initialRegion={{
//   latitude: 39.7392,
//   longitude: -104.9903,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
//   }}
