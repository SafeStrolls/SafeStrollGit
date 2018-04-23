import React, { Component } from 'react';
//import path from 'path';
//import { connect } from 'react-redux';
//import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import { emailChanged, passwordChanged, profileSave } from '../actions';
//import { Card, CardSection } from './common';

class GetAddress extends Component {


  render() {
    const homePlace = { description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
    const workPlace = { description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

    //const GooglePlacesInput = () => {
      return (
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details);
        }}
        getDefaultValue={() => ''}

        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyDfdhQkpV4QExJiG0vJtyOiNtTPCktWNZE',
          language: 'en', // language of the results
          types: '(cities)' // default: 'geocode'
        }}

        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}

        currentLocation
        // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch'
        // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
        }}
        GooglePlacesSearchQuery={{
          types: 'food'
        }}

        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        predefinedPlaces={[homePlace, workPlace]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
        // renderRightButton={() => <Text>Custom text after the input</Text>}
        />
    );
  }
}


export default GetAddress;
