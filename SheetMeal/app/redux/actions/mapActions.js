import { Location } from 'expo';
import qs from 'qs';

import { nutritionixConfig } from '../../config/nutritionix';


import {
  GET_CURRENT_POSITION,
  SELECT_RESTAURANT_REQUEST,
  SELECT_RESTAURANT_RESPONSE
} from './types';

const LATITUDE_DELTA = 0.035;
const LONGITUDE_DELTA = 0.035;

export const getCurrentPosition = () => async dispatch => {
  try {
    const {
      coords: {
        latitude,
        longitude
      }
    } = await Location.getCurrentPositionAsync({});

    dispatch({
      type: GET_CURRENT_POSITION,
      payload: {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const buildBrandSearchUrl = value => {
  const queryParams = qs.stringify({
    query: value.title,
    auto: false,
    type: 1,
    appId: nutritionixConfig.appId,
    appKey: nutritionixConfig.appKey,
  });

  return `${nutritionixConfig.apiEndpoint}/brand/search?${queryParams}`;
};

export const selectRestaurant = value => async dispatch => {
  try {
    dispatch({
      type: SELECT_RESTAURANT_REQUEST
    });

    const url = buildBrandSearchUrl(value);
    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.total > 0) {
      const brand = responseJSON.hits[0].fields;

      dispatch({
        type: SELECT_RESTAURANT_RESPONSE,
        payload: {
          id: brand._id,
          name: brand.name,
          website: brand.website,
        }
      });
    } else {
      dispatch({
        type: SELECT_RESTAURANT_RESPONSE,
        payload: null
      });
    }
  } catch (err) {
    console.log(err);
  }
};
