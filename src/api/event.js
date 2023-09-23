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
async function getEvent(id) {
  const options = {
    method: "GET",
    url: API_URL + "/events/" + id,
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function addEvent({ newData, newTags, type, images }) {
  const formData = new FormData();
  const request = {
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
    eventMode: newData.eventMode,
    paymentType: newData.paymentType,
    organization: newData.organization,
  };
  formData.append(`request`, new Blob([JSON.stringify(request)], { type: "application/json" }))
  Array.from(images).forEach((image) => {
    formData.append(`images`, image);
  })
  const options = {
    method: "POST",
    url: API_URL + "/events",
    data: formData
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    alert(error.response?.data?.message);
    return error.response?.data;
  }
}

async function modifyEvent({ newData, newTags, id, images }) {
  const formData = new FormData();
  const request = {
    name: newData.name,
    location: newData.location,
    informationUrl: newData.informationUrl,
    startDateTime: newData.startDateTime,
    endDateTime: newData.endDateTime,
    applyStartDateTime: newData.applyStartDateTime,
    applyEndDateTime: newData.applyEndDateTime,
    tags: newTags,
    imageUrl: newData.imageUrl,
    type: newData.type,
    eventMode: newData.eventMode,
    paymentType: newData.paymentType,
    organization: newData.organization,
  };
  formData.append(`request`, new Blob([JSON.stringify(request)], { type: "application/json" }))
  Array.from(images).forEach((image) => {
    formData.append(`images`, image);
  })
  const options = {
    method: "PUT",
    url: API_URL + "/events/" + id,
    data: formData
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
  getEvent,
  addEvent,
  modifyEvent,
  removeEvent,
};
