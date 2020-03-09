import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const client = {
  fetchSupplements(type) {
    // eslint-disable-next-line no-undef
    const password = window.atob(process.env.REACT_APP_PASSWORD);
    const usernamePassword = `${process.env.REACT_APP_USERNAME}:${password}`;
    const base64 = new Buffer(usernamePassword).toString('base64');
    return axios
      .get(`${BASE_URL}/${type}`, {
        crossDomain: true,
        headers: {
          Authorization: `Basic ${base64}`,
          Origin: 'https://suppsdb.com',
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        return {
          supplements: response.data
        };
      })
      .catch(error => {
        throw error;
      });
  },

  getWheyById(wheyId) {
    return axios
      .get(`${BASE_URL}/wheys/${wheyId}`)
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  }
};

export default client;
