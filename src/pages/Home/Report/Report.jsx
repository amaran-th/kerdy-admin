import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import reportApi from "../../../api/report";
import ReportList from "./ReportList";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    reportApi.getReports().then((data) => {
      setReports(data);
    });
  }, [refresh]);

  return (
    <div>
      <ReportList reports={reports} />
    </div>
  );
};

export default Report;
