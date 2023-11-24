import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import reportApi from "../../../api/report";
import ReportList from "./ReportList";
import { connect } from "react-redux";

const Report = ({ state }) => {
  const [reports, setReports] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    reportApi.getReports(state.envType.envType, state.token.token).then((data) => {
      setReports(data);
    });
  }, [refresh]);

  return (
    <div>
      <ReportList reports={reports} />
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Report);
