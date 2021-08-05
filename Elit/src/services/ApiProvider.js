import axios from 'react-native-axios'
import { getReqConfig, getAuthToken, getStatusCode, getBody, getStatusMessage } from '../utils/const.functions'
import ApiList from '../utils/const.apis'
import {NetworkInfo} from 'react-native-network-info';


class ApiProvider {
  constructor() {
    NetworkInfo.getIPAddress(ip => {
      console.log("Android:"+ip);
    });
    //var apiURL = "http://192.168.1.4:5002/"
    var apiURL = "http://192.168.1.22:5002/"
    this.api = axios.create({
      baseURL: apiURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async auth(url, data) {
    return new Promise((resolve, reject) => {
      getReqConfig().then(config => {
        getAuthToken(url, data).then(token => {
          if (token !== null) {
            this.api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          }
          if (ApiList.API_URL_FOR_LOGIN === url) {
            data = {}
          }
          const reqBody = {
            body: data,
            config: config
          }
          this.api.post(url, reqBody).then(response => {
            if (getStatusCode(response.data) === 200) {
              resolve(getBody(response.data))
            }
          })
        })
      })
    })
  }
  async post(url, data) {
    return new Promise((resolve, reject) => {
      getReqConfig().then(config => {
        getAuthToken(url, data).then(token => {
          if (token !== null) {
            this.api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          }
          const reqBody = {
            body: data,
            config: config
          }
          this.api.post(url, reqBody).then(response => {
            if (getStatusCode(response.data) === 200) {
              resolve(getBody(response.data))
            } else {
              getStatusMessage(response.data).then(result => {
                //showToast("error", result)
                resolve("error")
              })
            }
          })
            .catch(errorHandling => {
              resolve({
                DML_STATUS: "E"
              })
            });
        })
      })
    })
  }
  async post_createSupplier(url, request, data) {
    return new Promise((resolve, reject) => {
      getReqConfig().then(config => {
        getAuthToken(url, data).then(token => {
          if (token !== null) {
            token = token + "ELIT" + data
            this.api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          }

          const reqBody = {
            body: request,
            config: config
          }
          this.api.post(url, reqBody).then(response => {
            if (getStatusCode(response.data) === 200) {
              resolve(getBody(response.data))
            } else {
              getStatusMessage(response.data).then(result => {
                showToast("error", result)
                resolve("error")
              })
            }
          })
            .catch(errorHandling => {
              resolve({
                DML_STATUS: "E"
              })
            });
        })
      })
    })
  }

  async createSupplier(data, body) {
    return new Promise((resolve, reject) => {
      getReqConfig().then(config => {
        this.api.defaults.headers.common['Authorization'] = 'Bearer ' + data;
        const reqBody = {
          body: body,
          config: config
        }
        this.api.post("supplierRegistration/transactions", reqBody).then(response => {
          if (getStatusCode(response.data) === 201) {
            resolve(getBody(response.data))
          } else {
            resolve({
              DML_STATUS: "E",
              DML_MESSAGE: "Please contact to administrative!"
            })
          }
        })
          .catch(errorHandling => {
            resolve(errorHandling)
          });
      })
    })
  }
  async post_resetPassword(url, request, data) {
    return new Promise((resolve, reject) => {
      getReqConfig().then(config => {
        getPasswordToken(url, data).then(token => {
          if (token !== null) {
            token = token + "ELIT" + data
            this.api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          }

          const reqBody = {
            body: request,
            config: config
          }
          this.api.post(url, reqBody).then(response => {
            if (getStatusCode(response.data) === 200) {
              resolve(getBody(response.data))
            } else {
              getStatusMessage(response.data).then(result => {
                showToast("error", result)
                resolve("error")
              })
            }
          })
            .catch(errorHandling => {
              resolve({
                DML_STATUS: "E"
              })
            });
        })
      })
    })
  }
  async resetPassword(data, body) {
    return new Promise((resolve, reject) => {
      getReqConfig().then(config => {
        this.api.defaults.headers.common['Authorization'] = 'Bearer ' + data;
        const reqBody = {
          body: body,
          config: config
        }
        this.api.post("rolesAndPrivilages/ATS_ELIT_USER", reqBody).then(response => {
          if (getStatusCode(response.data) === 201) {
            resolve(getBody(response.data))
          } else {
            resolve({
              DML_STATUS: "E",
              DML_MESSAGE: "Please contact to administrative!"
            })
          }
        })
          .catch(errorHandling => {
            resolve(errorHandling)
          });
      })
    })
  }
  async downloadFile(url, fileName) {
    return new Promise((resolve, reject) => {
      this.api.get(url,
        { responseType: 'blob' }).then(response => {
          const content = response.headers['content-type'];
          download(response.data, fileName, content)
          resolve("success")
        })
    })
  }
}

const api = new ApiProvider();
export default api;
