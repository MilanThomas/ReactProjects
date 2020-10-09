import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MapView } from 'expo';

import MapMarker from '../../components/MapMarker';
import MapCallout from '../../components/MapCallout';

import {
  selectRestaurant,
} from '../../redux/actions';

import styles from './styles';

class MapViewContainer extends Component {

  componentDidUpdate() {
    this.mapRef.fitToElements(true);
  }

  selectRestaurant = restaurant => {
    this.props.selectRestaurant(restaurant);
    this.props.navigation.navigate('review');
  }

  renderUserLocation() {
    const { userLocation } = this.props.map;
    if (userLocation !== null) {
      return (
        <MapMarker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          color="#ff3b30"
        >
          <MapView.Callout>
            <MapCallout
              title="I'm here"
              action={false}
            />
          </MapView.Callout>
        </MapMarker>
      );
    }
  }

  renderRestaurantsMarkers() {
    const { restaurants } = this.props.map;
    if (restaurants !== null) {
      return restaurants.map(restaurant => (
        <MapMarker
          key={restaurant.id}
          coordinate={restaurant.coordinate}
          color="#007aff"
        >
          <MapView.Callout
            onPress={() => this.selectRestaurant(restaurant)}
          >
            <MapCallout
              title={restaurant.title}
              description={restaurant.description}
              action
            />
          </MapView.Callout>
        </MapMarker>
      ));
    }
  }

  render() {
    return (
      <MapView
        ref={ref => { this.mapRef = ref; }}
        loadingEnabled
        loadingIndicatorColor="#8e8e93"
        loadingBackgroundColor="#efeff4"
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        mapType="hybrid"
        region={this.props.map.userLocation}
        style={styles.container}
      >
        {this.renderUserLocation()}
        {this.renderRestaurantsMarkers()}
      </MapView>
    );
  }
}

export default connect(
  ({ map }) => ({ map }),
  { selectRestaurant }
)(MapViewContainer);
