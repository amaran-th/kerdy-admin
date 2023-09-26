import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { connect } from 'react-redux';

import { types } from "../../data";
const Home = ({ type, state }) => {
  const { envType } = state.envType
  console.log(envType)
  return types[type];
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Home);
