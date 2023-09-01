import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

async function getConference() {
  const options = {
    method: "GET",
    url: API_URL + "/events?category=CONFERENCE",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getCompetition() {
  const options = {
    method: "GET",
    url: API_URL + "/events?category=COMPETITION",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function addEvent({ newData, newTags, type }) {
  const options = {
    method: "POST",
    url: API_URL + "/events",
    headers: { token: "testtest" },
    data: {
      name: newData.name,
      location: newData.location,
      informationUrl: newData.informationUrl,
      startDateTime: newData.startDateTime,
      endDateTime: newData.endDateTime,
      applyStartDateTime: newData.applyStartDateTime,
      applyEndDateTime: newData.applyEndDateTime,
      tags: newTags,
      imageUrl: newData.imageUrl,
      type: type,
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

async function modifyEvent({ newData, newTags, type, id }) {
  const options = {
    method: "PUT",
    url: API_URL + "/events/" + id,
    headers: { token: "testtest" },
    data: {
      name: newData.name,
      location: newData.location,
      informationUrl: newData.informationUrl,
      startDateTime: newData.startDateTime,
      endDateTime: newData.endDateTime,
      applyStartDateTime: newData.applyStartDateTime,
      applyEndDateTime: newData.applyEndDateTime,
      tags: newTags,
      imageUrl: newData.imageUrl,
      type: type,
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
async function removeEvent({ id }) {
  const options = {
    method: "DELETE",
    url: API_URL + "/events/" + id,
    headers: { token: "testtest" },
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
  getConference,
  getCompetition,
  addEvent,
  modifyEvent,
  removeEvent,
};
