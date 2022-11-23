import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080'
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)
