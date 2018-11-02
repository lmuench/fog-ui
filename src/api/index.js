import store from '../store';

const leadingPathSegment = '/services';

const createUrl = path => {
  const connections = store.getState().connections.connections;
  const selected = store.getState().connections.selected;
  const connection = connections[selected]
  if (!connection) return null;
  const host = connection.host;
  if (!host) return null;
  return host + leadingPathSegment + path;
}

const api = {};

api.getArray = async path => {
  const url = createUrl(path);
  if (!url) return [];
  const res = await fetch(url);
  if (res.status !== 200) return [];
  return await res.json();
}

api.post = (path, data) => {
  const url = createUrl(path);
  if (!url) return;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data)
  });
}

api.get = async path => {
  const url = createUrl(path);
  if (!url) return {};
  const res = await fetch(url);
  if (res.status !== 200) return {};
  return await res.json();
}

api.put = (path, data) => {
  const url = createUrl(path);
  if (!url) return;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data)
  });
}

api.delete = path => {
  const url = createUrl(path);
  if (!url) return;
  fetch(url, { method: 'DELETE' });
}

export default api;
