import { StyleSheet } from 'react-native';

const searchDimension = 50;

export default StyleSheet.create({
  searchFieldContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchInputContainer: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
  },
  searchInput: {
    height: searchDimension,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 16,
    fontWeight: '500'
  },
  buttonContainer: {
    marginLeft: 0,
    marginRight: 0,
  },
  button: {
    width: searchDimension,
    height: searchDimension,
    padding: 0,
  },
  buttonDisabled: {
    backgroundColor: '#8e8e93',
  },
});
