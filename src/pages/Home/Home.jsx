import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { types } from "../../data";
const Home = ({ type }) => {
  const dateParser = (datetime) => {
    console.log(datetime.split(":"));
    var date = datetime.slice(0, 10);
    date = date.replaceAll(":", "-");
    return dayjs(date + " " + datetime.slice(11, 19)).format(
      "YYYY년 M월 D일 HH시 mm분"
    );
  };

  return types[type];
};

export default Home;
