import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Permissions } from 'expo';

import MapViewContainer from '../../containers/MapViewContainer';
import MapSearchContainer from '../../containers/MapSearchContainer';

import {
  getCurrentPosition,
  setSearchType
} from '../../redux/actions';

import styles from './styles';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Map',
    headerLeft: (
      <View />
    ),
    headerRight: (
      <Icon
        name="settings"
        color="#007aff"
        size={32}
        underlayColor="transparent"
        iconStyle={{ marginRight: 10 }}
        onPress={() => navigation.navigate('mapSettings')}
      />
    )
  });

  componentDidMount() {
    this.askUserPermission();
  }

  askUserPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === 'granted') {
        await this.props.getCurrentPosition();
        await this.props.setSearchType('find');
      } else {
        await this.props.setSearchType('field');
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapViewContainer navigation={this.props.navigation} />
        <MapSearchContainer />
      </View>
    );
  }
}

export default connect(
  null, {
  getCurrentPosition,
  setSearchType,
})(MapScreen);
