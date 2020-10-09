import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import {
  searchFoods,
} from '../../redux/actions';

import styles from './styles';

class ReviewScreen extends Component {
  static navigationOptions = () => ({
    tabBarLabel: 'Review',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="playlist-add-check"
        size={24}
        color={tintColor}
        underlayColor="transparent"
      />
    ),
  });

  searchFoods = () => {
    const { review } = this.props;
    this.props.searchFoods(review.brand.id, review.offset, review.limit);
  }

  render() {
    if (this.props.review.isFetching) {
      return (
        <ActivityIndicator />
      );
    }

    if (this.props.review.brand === null) {
      return (
        <View style={styles.container}>
          <Text>Oops ! No selected restaurant yet. Start by picking one on the Map Tab.</Text>
        </View>
      );
    }
    // Create a list of items which are selectable
    return (
      <View style={styles.container}>
        <Text>{this.props.review.brand.name}</Text>
        <Button
          raised
          large
          icon={{
            name: 'search'
          }}
          title="Get foods !"
          onPress={this.searchFoods}
        />
        {this.props.review.foods.length > 0 ?
          this.props.review.foods.map(food =>
            <Text key={food.id}>{food.name} - {food.calories}</Text>
          ) :
          null
        }

      </View>
    );
  }
}

export default connect(
  ({ review }) => ({ review }),
  { searchFoods }
)(ReviewScreen);
