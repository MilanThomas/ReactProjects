import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

import styles from './styles';

const MapLoading = ({ visible }) => (
  <Modal
    animationType="fade"
    supportedOrientations={['landscape', 'portrait']}
    transparent
    visible={visible}
  >
    <View style={styles.container}>
      <ActivityIndicator
        color="#ffffff"
        style={styles.spinner}
      />
    </View>
  </Modal>
);

export default MapLoading;
