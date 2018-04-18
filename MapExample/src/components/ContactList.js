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

  createDataSource({ contacts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
  }

  startButton() {
    return (
      <Button onPress={() => Actions.start()}>
        Start
      </Button>
    );
  }

  renderRow(contact) {
    return <ListItem contact={contact} />;
  }

  render() {
    return (
      <Card>
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
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const contacts = _.map(state.contacts, (val, uid) => {
    return { ...val, uid };
  });

  return { contacts };
};

export default connect(mapStateToProps, { contactsFetch })(ContactList);


// import _ from 'lodash';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { ListView } from 'react-native';
// import { contactsFetch } from '../actions';
// import ListItem from './ListItem';
//
// class ContactList extends Component {
//   componentWillMount() {
//     this.props.contactsFetch();
//
//     this.createDataSource(this.props);
//   }
//
// componentWillReceiveProps(nextProps) {
//   //nextProps are the next set of props that this components
//   //will be rendered with
//   //this.props is still the old set of props
//   this.createDataSource(nextProps);
// }
//
// createDataSource({ contacts }) {
//   const ds = new ListView.DataSource({
//     rowHasChanged: (r1, r2) => r1 !== r2
//   });
//
//     this.dataSource = ds.cloneWithRows(contacts);
// }
//
// renderRow(contact) {
//   return <ListItem contact={contact} />;
// }
//
//   render() {
//     return (
//       <ListView>
//         enableEmptySections
//         dataSource={this.dataSource}
//         renderRow={this.renderRow}
//       />
//     );
//   }
// }
//
// const mapStateToProps = state => {
//   const contacts = _.map(state.contacts, (val, uid) => {
//     return { ...val, uid };
//   });
//
//   return { contacts };
// };
//
// export default connect(mapStateToProps, { contactsFetch })(ContactList);
