import axios from "axios";
import { getApiUrl } from "../util";

async function getConference(envType) {
  const options = {
    method: "GET",
    url: getApiUrl(envType) + "/events?category=CONFERENCE",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getCompetition(envType) {
  const options = {
    method: "GET",
    url: getApiUrl(envType) + "/events?category=COMPETITION",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
async function getEvent({ id, envType }) {
  const options = {
    method: "GET",
    url: getApiUrl(envType) + "/events/" + id,
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function addEvent({ newData, newTags, type, images, envType }) {
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
    url: getApiUrl(envType) + "/admin/events",
    data: formData
  };
  try {
    const response = await axios(options);
    alert("정상적으로 등록되었습니다.")
    return response;
  } catch (error) {
    alert(error.response?.data?.message);
    return error.response?.data;
  }
}

async function modifyEvent({ newData, newTags, id, images, envType }) {
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
    url: getApiUrl(envType) + "/admin/events/" + id,
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
async function removeEvent({ id, envType }) {
  const options = {
    method: "DELETE",
    url: getApiUrl(envType) + "/admin/events/" + id,
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
