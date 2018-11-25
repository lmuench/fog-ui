const resources = (state = { mappings: [], api: [], resources: [], endpoints: [], newValues: [] }, action) => {
  const resources = [...state.resources];
  const resource = action.value;
  switch (action.type) {
    case 'SET_MAPPINGS':
      return { ...state, mappings: action.value };
    case 'SET_API':
      return { ...state, api: action.value };
    case 'CLEAR_RESOURCES':
      return { ...state, resources: [] };
    case 'ADD_RESOURCE':
      resource.index = resources.length;
      resources.push(resource);
      return { ...state, resources };
    case 'UPDATE_RESOURCE':
      resource.index = action.index;
      resources[action.index] = resource;
      return { ...state, resources };
    case 'SET_NEW_VALUE':
      const newValues = [...state.newValues];
      newValues[action.index] = action.value;  
      return { ...state, newValues };
    default:
      return state;
  }
};


export default resources;