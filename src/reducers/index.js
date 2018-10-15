import { combineReducers } from 'redux'
import { reducer as sematable } from 'sematable';
import resources from './resources';
import connections from './connections';
import mappings from './mappings';

export default combineReducers({
  sematable,
  resources,
  connections,
  mappings
});
