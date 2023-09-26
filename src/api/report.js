import axios from "axios";
import { getApiUrl } from "../util";


async function getReports(envType) {
  const options = {
    method: "GET",
    url: getApiUrl(envType) + "/reports",
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
