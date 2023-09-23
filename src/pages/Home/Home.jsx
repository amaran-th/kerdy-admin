import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { types } from "../../data";
const Home = ({ type }) => {
  return types[type];
};

export default Home;
