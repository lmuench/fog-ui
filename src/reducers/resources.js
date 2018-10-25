const resources = (state = { mappings: [], resources: [], endpoints: [], newValues: [] }, action) => {
  switch (action.type) {
    case 'SET_MAPPINGS':
      return { ...state, mappings: action.value };
    case 'CLEAR_RESOURCES':
      return { ...state, resources: [] };
    case 'ADD_RESOURCE':
      const resources = [...state.resources];
      const resource = action.value;
      resource.index = resources.length;
      resources.push(resource);
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