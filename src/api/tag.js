import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

async function getTags() {
  const options = {
    method: "GET",
    url: API_URL + "/tags",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function addTag() {
  const options = {
    method: "POST",
    url: API_URL + "/tags",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  getTags,
  addTag,
};
