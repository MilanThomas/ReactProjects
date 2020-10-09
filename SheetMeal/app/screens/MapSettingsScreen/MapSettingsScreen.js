import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import SettingsSlider from '../../components/SettingsSlider';

import styles from './styles';

import {
  setRadius,
} from '../../redux/actions';

class MapSettingsScreen extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Settings',
    headerRight: (
      <View />
    ),
  });

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <SettingsSlider
          title="Search radius"
          minimumValue={1}
          maximumValue={30}
          step={1}
          value={this.props.mapSettings.radius}
          onValueChange={this.props.setRadius}
        />
      </View>
    );
  }
}

export default connect(
  ({ mapSettings }) => ({ mapSettings }), {
    setRadius,
  }
)(MapSettingsScreen);
