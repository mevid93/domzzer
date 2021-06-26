import axios from 'axios'

const baseUrl = '/api/slaves'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const getById = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const create = (newSlave) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newSlave, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const update = (id, updatedData) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${id}`, updatedData, config)
  return request.then(response => response.data)
}

const service = { getAll, getById, create, remove, update, setToken }
export default service