import {
  SELECT_RESTAURANT_REQUEST,
  SELECT_RESTAURANT_RESPONSE,
  SEARCH_FOOD_REQUEST,
  SEARCH_FOOD_RESPONSE
} from '../actions/types';

const initialState = {
  isFetching: false,
  brand: null,
  offset: 0,
  limit: 50,
  foods: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_RESTAURANT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SELECT_RESTAURANT_RESPONSE:
      return {
        ...state,
        brand: action.payload,
        isFetching: false
      };
    case SEARCH_FOOD_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SEARCH_FOOD_RESPONSE:
      return {
        ...state,
        offset: action.payload.offset,
        foods: [...action.payload.foods, ...state.foods],
        isFetching: false,
      };
    default:
      return state;
  }
};
