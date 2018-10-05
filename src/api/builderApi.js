// TODO: create url dynamically from values stored in localStorage
const base = 'http://localhost:8080/fognode/services/builder';

const builderApi = {
  get: {},
  put: {},
  delete: {}
};

builderApi.get.endpoints = async () => {
  const path = '/endpoints';
  const res = await fetch(base + path);
  if (res.status !== 200) return [];
  return await res.json();
}

builderApi.get.mapping = async () => {
  const path = '/mapping';
  const res = await fetch(base + path);
  if (res.status !== 200) return [];
  return await res.json();
}

builderApi.put.mapping = data => {
  const path = '/mapping';
  const res = fetch(base + path, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

builderApi.delete.mapping = data => {
  const path = '/mapping';
  const res = fetch(base + path, {
    method: 'DELETE'
  });
}

export default builderApi;
