import axios from "axios";
import { getApiUrl } from "../util";

async function login({ id, password, envType }) {
    const options = {
        method: "POST",
        url: getApiUrl(envType) + "/admin/login",
        data: { id, password },
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
    login
};
