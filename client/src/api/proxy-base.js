import axios from '../utils/axios'

class BaseProxy {
  constructor (routerpoint, parameters = {}) {
    this.routerpoint = routerpoint
    this.parameters = parameters
  }

  submitGet (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  submitPost (url, params = null) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  submitDelete (url, params = null) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `${url}`
      }).then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  submitDeleteOne (url, params = null) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `${url}/${params}`,
        data: `${params}`
      }).then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  submitPut (url, params = null) {
    return new Promise((resolve, reject) => {
      axios.put(url, params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default BaseProxy
