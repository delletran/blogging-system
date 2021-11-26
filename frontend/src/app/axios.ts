import axios from "axios"
import { store } from "./store"
import { baseUrl } from "./api"


const axiosApi = axios.create({
  baseURL: baseUrl,
})

axiosApi.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access")
    config.headers = {
      "Authorization": accessToken && `Bearer ${accessToken}`,
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
      type: "REQUEST_FAIL",
      message: error.message,
      error: error.response.data,
    })
  }
)


export default axiosApi 
