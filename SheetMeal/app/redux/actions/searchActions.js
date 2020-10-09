import qs from 'qs';
import debounce from 'lodash/debounce';

import { geocodingConfig, placesConfig } from '../../config/google';

import {
  SET_SEARCH_TYPE,
  SET_SEARCH_VALUE,
  NEW_SEARCH,
  SELECT_ADDRESS,
  AUTOCOMPLETE_ADDRESS_REQUEST,
  AUTOCOMPLETE_ADDRESS_RESPONSE,
  SEARCH_ADDRESS,
  FIND_RESTAURANTS_REQUEST,
  FIND_RESTAURANTS_RESPONSE
} from './types';

const LATITUDE_DELTA = 0.035;
const LONGITUDE_DELTA = 0.035;

export const setSearchType = type => ({
  type: SET_SEARCH_TYPE,
  payload: type
});

export const setSearchValue = value => ({
  type: SET_SEARCH_VALUE,
  payload: value
});

export const newSearch = () => ({
  type: NEW_SEARCH
});

export const selectAddress = value => ({
  type: SELECT_ADDRESS,
  payload: value
});

const buildAutocompleteUrl = input => {
  const queryParams = qs.stringify({
    input,
    types: 'address',
    key: placesConfig.apiKey
  });

  return `${placesConfig.apiEndpoint}/autocomplete/json?${queryParams}`;
};

const debouncedAutocompleteAddress = debounce(async (address, dispatch) => {
    const url = await buildAutocompleteUrl(address);

    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.status === 'OK') {
      const predictions = responseJSON.predictions.map(prediction => ({
        description: prediction.description,
        id: prediction.id
      }));

      dispatch({
        type: AUTOCOMPLETE_ADDRESS_RESPONSE,
        payload: predictions
      });
    } else {
      dispatch({
        type: AUTOCOMPLETE_ADDRESS_RESPONSE,
        payload: []
      });
    }
}, 1000);

export const autocompleteAddress = address => dispatch => {
  try {
    dispatch(setSearchValue(address));

    dispatch({
      type: AUTOCOMPLETE_ADDRESS_REQUEST
    });

    debouncedAutocompleteAddress(address, dispatch);
  } catch (err) {
    console.log(err);
  }
};

const buildGeocodingUrl = address => {
  const queryParams = qs.stringify({
    address,
    key: geocodingConfig.apiKey
  });

  return `${geocodingConfig.apiEndpoint}/json?${queryParams}`;
};

// Add Autocomplete from Google Places API Webservices
export const searchAddress = address => async dispatch => {
  try {
    const url = buildGeocodingUrl(address);
    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.status === 'OK') {
      const { lat, lng } = responseJSON.results[0].geometry.location;

      dispatch({
        type: SEARCH_ADDRESS,
        payload: {
          latitude: lat,
          longitude: lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};


const buildTextSearchUrl = (location, radius, brands) => {
  const { latitude, longitude } = location;
  const query = qs.stringify({
    query: brands.join(' OR '),
    type: 'restaurant',
    location: `${latitude},${longitude}`,
    radius: radius * 1000,
    key: placesConfig.apiKey,
  });

  return `${placesConfig.apiEndpoint}/textsearch/json?${query}`;
};

// Search restaurants for location (SearchButton)
// Store the results in the search reducer
export const findRestaurants = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FIND_RESTAURANTS_REQUEST
    });
    const userLocation = await getState().map.userLocation;
    const mapSettings = await getState().mapSettings;
    // Add selector here
    const url = await buildTextSearchUrl(userLocation, mapSettings.radius, mapSettings.brands);
    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.status === 'OK') {
      const restaurants = responseJSON.results.map(result => ({
        id: result.id,
        title: result.name,
        description: result.formatted_address,
        coordinate: {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        }
      }));
      dispatch({
        type: FIND_RESTAURANTS_RESPONSE,
        payload: restaurants
      });
    }
  } catch (err) {
    console.log(err);
  }
};
