import { Alert } from 'react-native';
const Api = {
  setting: {
    token: '',
    userid: '',
  },
  
  getParams(method, body) {
    if (this.setting.token === '' || this.setting.token === null || this.setting.token === undefined) {
      return {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
    }
    return {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.setting.token}` },
      body: JSON.stringify(body),
    };
  },
  checkStatus(response) {
    return response;
  },

};

export default Api;
