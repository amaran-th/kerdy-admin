import axios from "axios";
import { getApiUrl } from "../util";

async function getTags(envType) {
  const options = {
    method: "GET",
    url: getApiUrl(envType) + "/tags",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function addTag({ name, envType }) {
  const options = {
    method: "POST",
    url: getApiUrl(envType) + "/tags",
    data: { name },
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
  getTags,
  addTag,
};