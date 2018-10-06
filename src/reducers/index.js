import { combineReducers } from 'redux'
import { reducer as sematable } from 'sematable';
import connections from './connections';

export default combineReducers({
  sematable,
  connections
});
