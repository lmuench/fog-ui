function Connection() {
  this.name = '';
  this.api = '';
  this.webConsole = '';
}

const getConnections = () => {
  const connections = JSON.parse(localStorage.getItem('connections')) || [];
  connections.push(new Connection());
  connections.forEach((connection, i) => connection.index = i);
  return connections;
}

const getSelected = () => (
  Number(localStorage.getItem('selectedConnection'))
);

const connections = (state = { connections: getConnections(), selected: getSelected() }, action) => {
  switch (action.type) {
    case 'SET_CONNECTION_VALUE':
      const connections = [...state.connections];
      connections[action.index][action.column] = action.value;
      return { ...state, connections };
    case 'SELECT_CONNECTION':
      return { ...state, selected: action.index };
    default:
      return state
  }
};

export default connections;
