import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

const MapCallout = ({ title, description, action }) => (
  <View style={styles.container}>
    {
      action ?
        <View style={styles.action}>
          <Icon
            name="check"
            size={32}
            color="#ffffff"
            underlayColor="transparent"
            iconStyle={styles.icon}
            containerStyle={styles.iconContainer}
          />
        </View>
      : null
    }
    <View style={styles.text}>
      <Text style={styles.title}>{title}</Text>
      {
        description ?
          <Text style={styles.description}>{description}</Text>
        : null
      }
    </View>
  </View>
);

export default MapCallout;
