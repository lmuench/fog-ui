const resources = (state = { mappings: [], resources: [], endpoints: [] }, action) => {
  const resources = [...state.resources];
  switch (action.type) {
    case 'SET_MAPPINGS':
      return { ...state, mappings: action.value };
    case 'CLEAR_RESOURCES':
      return { ...state, resources: [] };
    case 'ADD_RESOURCE':
      resources.push(action.value);
      return { ...state, resources };
    default:
      return state;
  }
};


export default resources;