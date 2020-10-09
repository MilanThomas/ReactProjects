import {
  GET_CURRENT_POSITION,
  NEW_SEARCH,
  SEARCH_ADDRESS,
  FIND_RESTAURANTS_RESPONSE
} from '../actions/types';

const initialState = {
  userLocation: null,
  restaurants: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_POSITION:
      return {
        ...state,
        userLocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: action.payload.latitudeDelta,
          longitudeDelta: action.payload.longitudeDelta,
        }
      };
    case NEW_SEARCH:
      return {
        ...state,
        restaurants: null
      };
    case SEARCH_ADDRESS:
      return {
        ...state,
        userLocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: action.payload.latitudeDelta,
          longitudeDelta: action.payload.longitudeDelta,
        }
      };
    case FIND_RESTAURANTS_RESPONSE:
      return {
        ...state,
        restaurants: action.payload
      };
    default:
      return state;
  }
};
