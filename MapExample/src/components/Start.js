import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, ListView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Card, CardSection, Button } from './common';
import { contactsFetch } from '../actions';
import ListItem from './ListItem';

class Start extends Component {
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
    return <ListItem contact={contact} />;
  }

  render() {
    return (
      <Card>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.container}
            initialRegion={{
              latitude: 39.7392,
              longitude: -104.9903,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              }}
          />
          <CardSection style={{ height: 200 }}>
              <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
              />
          </CardSection>

          <CardSection>
            <Button onPress={() => Actions.direction()}>
              Go home
            </Button>
          </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
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

export default connect(mapStateToProps, { contactsFetch })(Start);
