import axios from "axios";
import { getApiUrl } from "../util";

async function getActivities(envType) {
  const options = {
    method: "GET",
    url: getApiUrl(envType) + "/activities",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function addActivity({ name, activityType, envType }) {
  const options = {
    method: "POST",
    url: getApiUrl(envType) + "/admin/activities",
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
