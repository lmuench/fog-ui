const resources = (state = { resources: [] }, action) => {
  const resources = [...state.resources];
  switch (action.type) {
    // case 'SET_INITIAL_RESOURCES':
    //   return { ...state, resources: action.value };
    // case 'NEW_RESOURCE':
    //   resources.push(new Connection(resources.length));
    //   return { ...state, resources };
    // case 'DELETE_RESOURCE':
    //   resources.splice(action.index, 1);
    //   resources.forEach((resource, i) => resource.index = i);
    //   return { ...state, resources };
    // case 'SET_RESOURCE_VALUE':
    //   resources[action.index][action.column] = action.value;
    //   return { ...state, resources };
    default:
      return state;
  }
};


export default resources;