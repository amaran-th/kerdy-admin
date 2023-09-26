import dayjs from "dayjs";

export const dateParser = (datetime) => {
  var date = datetime?.slice(0, 10);
  date = date?.replaceAll(":", "-");
  return dayjs(date + " " + datetime?.slice(11, datetime?.length)).format(
    "YYYY년 M월 D일 HH시 mm분"
  );
};

export const dateParser2 = (datetime) => {
  var date = datetime?.slice(0, 10);
  date = date?.replaceAll(":", "-");
  return dayjs(date + "T" + datetime?.slice(11, datetime?.length)).format('YYYY-MM-DDTHH:mm:ss')
};

export const getApiUrl = (type) => {
  if (type === "local") return process.env.REACT_APP_LOCAL_API_URL;
  if (type === "dev") return process.env.REACT_APP_DEV_API_URL;
  if (type === "prod") return process.env.REACT_APP_PROD_API_URL;
};

export const getImagePath = (type) => {
  if (type === "local") return '';
  if (type === "dev") return process.env.REACT_APP_DEV_IMAGE_PATH;
  if (type === "prod") return process.env.REACT_APP_PROD_IMAGE_PATH;
};