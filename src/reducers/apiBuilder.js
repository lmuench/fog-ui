const apiBuilder = (state = { mappings: [] }, action) => {
  const mappings = [...state.mappings];
  switch (action.type) {
    case 'SET_INITIAL_MAPPINGS':
      return { ...state, mappings: action.value };
    case 'SET_MAPPING_VALUE':
      mappings[action.index][action.column] = action.value;
      return { ...state, mappings };
    default:
      return state;
  }
};

export default apiBuilder;
