import {
  SET_SEARCH_TYPE,
  SET_SEARCH_VALUE,
  NEW_SEARCH,
  SELECT_ADDRESS,
  AUTOCOMPLETE_ADDRESS_REQUEST,
  AUTOCOMPLETE_ADDRESS_RESPONSE,
  GET_CURRENT_POSITION,
  SEARCH_ADDRESS,
  FIND_RESTAURANTS_REQUEST,
  FIND_RESTAURANTS_RESPONSE
} from '../actions/types';

const initialState = {
  isFetching: false,
  type: null,
  value: '',
  predictions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TYPE:
      return {
        ...state,
        type: action.payload
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        value: action.payload
      };
    case NEW_SEARCH:
      return {
        ...state,
        type: 'field',
        value: '',
        predictions: []
      };
    case SELECT_ADDRESS:
      return {
        ...state,
        value: action.payload,
        predictions: []
      };
    case AUTOCOMPLETE_ADDRESS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case AUTOCOMPLETE_ADDRESS_RESPONSE:
      return {
        ...state,
        isFetching: false,
        predictions: action.payload
      };
    case GET_CURRENT_POSITION:
      return {
        ...state,
        type: 'find'
      };
    case SEARCH_ADDRESS:
      return {
        ...state,
        type: 'find'
      };
    case FIND_RESTAURANTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FIND_RESTAURANTS_RESPONSE:
      return {
        ...state,
        type: 'new',
        isFetching: false
      };
    default:
      return state;
  }
};
