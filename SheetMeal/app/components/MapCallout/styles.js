import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    maxWidth: 200,
    flexDirection: 'column',
  },
  title: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  },
  description: {
    color: '#8e8e93',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    marginTop: 10,
  },
  action: {
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {

  },
  iconContainer: {
    backgroundColor: '#007aff',
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
