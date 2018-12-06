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

const bundleJsonAndStatus = async res => {
  const jsonAndStatus = {};
  jsonAndStatus.status = res.status;
  jsonAndStatus.json = (res.status === 200) ? await res.json() : {};
  console.log(jsonAndStatus);
  return jsonAndStatus;
}

const api = {};

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

api.postWithStatus = async (path, data) => {
  const url = createUrl(path);
  if (!url) return;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data)
  });
  return await bundleJsonAndStatus(res);
}

api.get = async path => {
  const url = createUrl(path);
  if (!url) return {};
  const res = await fetch(url);
  if (res.status !== 200) return {};
  return await res.json();
}

api.getWithStatus = async path => {
  const url = createUrl(path);
  if (!url) return {};
  const res = await fetch(url);
  return await bundleJsonAndStatus(res);
}

api.getArray = api.get;

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

api.putWithStatus = async (path, data) => {
  const url = createUrl(path);
  if (!url) return;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data)
  });
  return await bundleJsonAndStatus(res);
}

api.delete = path => {
  const url = createUrl(path);
  if (!url) return;
  fetch(url, { method: 'DELETE' });
}

api.deleteWithStatus = async path => {
  const url = createUrl(path);
  if (!url) return;
  const res = await fetch(url, { method: 'DELETE' });
  return await bundleJsonAndStatus(res);
}

export default api;
