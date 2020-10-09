import React from 'react';
import { Text, View } from 'react-native';
import { Slider } from 'react-native-elements';

import styles from './styles';

const SettingsSlider = ({ title, minimumValue, maximumValue, step, value, onValueChange }) => (
  <View style={styles.sliderContainer}>
    <Text style={styles.sliderText}>{title}</Text>
    <Text style={styles.sliderValue}>{value} km</Text>
    <Slider
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      value={value}
      minimumTrackTintColor="#ff2d55"
      maximumTrackTintColor="#efeff4"
      thumbTintColor="#ff2d55"
      style={styles.slider}
      trackStyle={styles.sliderTrack}
      thumbStyle={styles.sliderThumb}
      onValueChange={onValueChange}
    />
  </View>
);

export default SettingsSlider;
