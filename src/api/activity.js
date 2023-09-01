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

async function addActivity({ name, activityType }) {
  const options = {
    method: "POST",
    url: API_URL + "/activities",
    headers: { token: "testtest" },
    data: {
      name,
      activityType,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
    return error.response.data;
  }
}

export default {
  getActivities,
  addActivity,
};
