import React from 'react';
import { View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import styles from './styles';

const SearchField = ({ value, isFetching, onChange, onSubmit }) => (
  <View style={styles.searchFieldContainer}>
    <FormInput
      placeholder="Enter an address..."
      placeholderTextColor="#8e8e93"
      underlineColorAndroid="transparent"
      returnKeyType="search"
      value={value}
      containerStyle={styles.searchInputContainer}
      inputStyle={styles.searchInput}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
    />
    <Button
      icon={!isFetching ? {
        name: 'search',
        size: 26,
        style: {
          marginRight: 0,
          marginLeft: 0
        }
      } : null}
      loading={isFetching}
      loadingRight
      backgroundColor="#007aff"
      onPress={onSubmit}
      containerViewStyle={styles.buttonContainer}
      buttonStyle={styles.button}
      disabled={(value === '') || isFetching}
      disabledStyle={styles.buttonDisabled}
    />
  </View>
);

export default SearchField;
