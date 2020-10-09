import {
  SET_RADIUS
} from '../actions/types';

const initialState = {
  radius: 10,
  brands: [
    "McDonald's",
    'Quick',
    "Domino's",
    'Subway',
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RADIUS:
      return {
        ...state,
        radius: action.payload
      };
    default:
      return state;
  }
};
