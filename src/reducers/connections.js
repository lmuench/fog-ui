function Connection(index) {
  this.index = index;
  this.name = '';
  this.host = '';
  this.description = '';
}

const getConnections = () => {
  const connections = JSON.parse(localStorage.getItem('connections')) || [];
  connections.forEach((connection, i) => connection.index = i);
  return connections;
}

const getSelected = () => (
  Number(localStorage.getItem('selectedConnection'))
);

const connections = (state = { connections: getConnections(), selected: getSelected() }, action) => {
  const connections = [...state.connections];
  switch (action.type) {
    case 'NEW_CONNECTION':
      connections.push(new Connection(connections.length));
      return { ...state, connections };
    case 'SET_CONNECTION_VALUE':
      connections[action.index][action.column] = action.value;
      return { ...state, connections };
    case 'DELETE_CONNECTION':
      connections.splice(action.index, 1);
      connections.forEach((connection, i) => connection.index = i);
      return { ...state, connections };
    case 'SAVE_CONNECTIONS':
      localStorage.setItem(
        'connections',
        JSON.stringify(connections)
      );
      return state;
    case 'SELECT_CONNECTION':
      localStorage.setItem(
        'selectedConnection',
        action.index
      );
      return { ...state, selected: action.index };
    default:
      return state;
  }
};

export default connections;
