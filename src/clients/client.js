import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const client = {
  fetchSupplements(type) {
    return axios
      .get(`${BASE_URL}/${type}`)
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
