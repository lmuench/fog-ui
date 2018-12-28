import { combineReducers } from 'redux'
import { reducer as sematable } from 'sematable';
import connections from './connections';
import apiBuilder from './apiBuilder';
import resourceAccess from './resourcesAccess';

export default combineReducers({
  sematable,
  connections,
  apiBuilder,
  resourceAccess
});
