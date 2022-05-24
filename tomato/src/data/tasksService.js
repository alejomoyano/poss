// hacemos la conexion a db (json)

import axios from "axios";

const url = "http://localhost:3001/tasks";

export const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const addNew = async (content) => {
  const task = {
    content,
    state: "active",
  };
  const response = await axios.post(url, task);
  return response.data;
};

export const deleteOne = async (id) => {
  const response = await axios.delete(url+`/${id}`);
  return response.data;
};

export const updateState = async (id, state) => {
    console.log(url+`/${id}`);
    const response = await axios.patch(url+`/${id}`,{"state":state});
    return response.data;
};
