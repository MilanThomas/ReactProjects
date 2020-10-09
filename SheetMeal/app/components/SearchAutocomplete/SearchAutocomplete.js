import React from 'react';
import { ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import styles from './styles';

const SearchAutocomplete = ({ dataSource, onPress }) => (
  <List containerStyle={styles.container}>
    <ListView
      enableEmptySections
      keyboardShouldPersistTaps="always"
      renderRow={(rowData, sectionID) =>
        <ListItem
          key={sectionID}
          title={rowData.description}
          hideChevron
          underlayColor="transparent"
          onPress={() => onPress(rowData.description)}
          containerStyle={styles.itemContainer}
          wrapperStyle={styles.itemWrapper}
          titleContainerStyle={styles.itemTitleContainer}
          titleStyle={styles.itemTitle}
        />
      }
      dataSource={dataSource}
    />
  </List>
);

export default SearchAutocomplete;
