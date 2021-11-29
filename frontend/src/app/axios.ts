import axios from "axios"
import { store } from "./store"
import { baseUrl } from "./api"


const axiosApi = axios.create({
  baseURL: baseUrl,
})

axiosApi.interceptors.request.use(
  async (config) => {
    const data = JSON.parse(localStorage.getItem("userCredentials") as string)
    config.headers = {
      "Authorization": data.access && `Bearer ${data.access}`,
    } as { Authorization: string }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosApi.interceptors.response.use(
  (next) => {
    return Promise.resolve(next)
  },
  (error) => {
    store.dispatch({
      type: "request/rejected",
      message: error.message,
      error: error.response.data,
    })
  }
)


export default axiosApi 
