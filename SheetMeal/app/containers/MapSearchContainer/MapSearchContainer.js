import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';

import SearchField from '../../components/SearchField';
import SearchAutocomplete from '../../components/SearchAutocomplete';
import SearchButton from '../../components/SearchButton';

import {
  autocompleteAddress,
  newSearch,
  selectAddress,
  searchAddress,
  findRestaurants
} from '../../redux/actions';

import styles from './styles';

class MapSearchContainer extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.search.predictions)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.search.predictions)
    });
  }

  searchAddress = () => {
    this.props.searchAddress(this.props.search.value);
  }

  renderSearch() {
    const { search } = this.props;

    if (search.type === 'find') {
      return (
        <View style={[styles.container, styles.searchButton]}>
          <SearchButton
            title="Show nearby fast-foods"
            backgroundColor="#007aff"
            isFetching={search.isFetching}
            onPress={this.props.findRestaurants}
          />
        </View>
      );
    } else if (search.type === 'new') {
      return (
        <View style={[styles.container, styles.searchButton]}>
          <SearchButton
            title="New search"
            backgroundColor="#5ac8fa"
            isFetching={search.isFetching}
            onPress={this.props.newSearch}
          />
        </View>
      );
    } else if (search.type === 'field') {
      return (
        <View style={[styles.container, styles.searchField]}>
          <SearchField
            value={search.value}
            isFetching={search.isFetching}
            onChange={this.props.autocompleteAddress}
            onSubmit={this.searchAddress}
          />
          <SearchAutocomplete
            dataSource={this.state.dataSource}
            onPress={this.props.selectAddress}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    return this.renderSearch();
  }
}

export default connect(
  ({ search }) => ({ search }),
  { autocompleteAddress, newSearch, selectAddress, searchAddress, findRestaurants }
)(MapSearchContainer);
