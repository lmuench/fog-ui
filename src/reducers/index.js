import { combineReducers } from 'redux'
import { reducer as sematable } from 'sematable';
import connections from './connections';
import mappings from './mappings';

export default combineReducers({
  sematable,
  connections,
  mappings
});
