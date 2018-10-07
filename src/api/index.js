// TODO: create url dynamically from values stored in localStorage
const base = 'http://localhost:8080/services';

const api = {};

api.getArray = async path => {
  const res = await fetch(base + path);
  if (res.status !== 200) return [];
  return await res.json();
}

api.put = (path, data) => {
  const res = fetch(base + path, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

api.delete = path => {
  const res = fetch(base + path, {
    method: 'DELETE'
  });
}

export default api;
