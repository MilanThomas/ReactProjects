import React from 'react';
import { Button } from 'react-native-elements';

import styles from './styles';

const SearchButton = ({
  title, backgroundColor,
  onPress,
  isFetching
}) => (
  <Button
    title={isFetching ? 'Loading...' : title}
    raised
    loading={isFetching}
    loadingRight
    fontSize={18}
    backgroundColor={backgroundColor}
    onPress={onPress}
    containerViewStyle={styles.buttonContainer}
    buttonStyle={styles.button}
    textStyle={styles.buttonText}
    disabled={isFetching}
    disabledStyle={styles.buttonDisabled}
  />
);

export default SearchButton;
