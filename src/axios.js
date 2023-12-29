import axios from "axios";

const makeRequest = (token='') => axios.create({
  baseURL: "http://localhost:3001/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

export default makeRequest;
