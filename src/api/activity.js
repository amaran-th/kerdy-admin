import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

async function getActivities() {
  const options = {
    method: "GET",
    url: API_URL + "/activities",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  getActivities,
};
