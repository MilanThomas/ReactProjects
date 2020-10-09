import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

class ProfileScreen extends Component {
  static navigationOptions = () => ({
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="person"
        size={24}
        color={tintColor}
        underlayColor="transparent"
      />
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>TODO</Text>
      </View>
    );
  }
}

export default ProfileScreen;
