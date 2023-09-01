import dayjs from "dayjs";

export const dateParser = (datetime) => {
  var date = datetime.slice(0, 10);
  date = date.replaceAll(":", "-");
  return dayjs(date + " " + datetime.slice(11, datetime.length)).format(
    "YYYY년 M월 D일 HH시 mm분"
  );
};
