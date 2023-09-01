import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

async function getReports() {
  const options = {
    method: "GET",
    url: API_URL + "/reports",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  getReports,
};
