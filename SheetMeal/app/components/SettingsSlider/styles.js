import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  sliderContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  sliderText: {
    color: '#8e8e93',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600'
  },
  sliderValue: {
    color: '#ff2d55',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700'
  },
  slider: {
    alignSelf: 'stretch',
    marginTop: 10,
  },
  sliderTrack: {},
  sliderThumb: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  }
});
