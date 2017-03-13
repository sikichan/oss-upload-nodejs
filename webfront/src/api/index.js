import axios from 'axios'
const API_HOST = process.env.API_HOST
console.log(API_HOST)

export const getPolicy = () => {
  return axios.get(`${API_HOST}/policy`)
}
