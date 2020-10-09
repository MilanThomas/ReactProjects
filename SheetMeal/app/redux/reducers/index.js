import { combineReducers } from 'redux';
import map from './mapReducer';
import mapSettings from './mapSettingsReducer';
import search from './searchReducer';
import review from './reviewReducer';

export default combineReducers({
  map,
  mapSettings,
  search,
  review
});
