const BASE_URL = "http://localhost:3001";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getItemList = () => {
  return fetch(`${BASE_URL}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

const addItem = ({ name, link, weatherType }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
      weatherType,
    }),
  }).then(handleServerResponse);
};

const removeItem = (id) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

const api = {
  getItemList,
  addItem,
  removeItem,
};

export default api;
