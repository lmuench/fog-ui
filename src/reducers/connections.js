function Gateway() {
  this.id = 0;
  this.name = '';
  this.api = '';
  this.webConsole = '';
}

const connections = (state = { connections: [new Gateway()], selected: null }, action) => {
  switch (action.type) {
    case 'SET_CONNECTION_VALUE':
      const connections = state.connections;
      connections[action.index][action.column] = action.value;
      return { ...state, connections };
    default:
      return state
  }
};

export default connections;
