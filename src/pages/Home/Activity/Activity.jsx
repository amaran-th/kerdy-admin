import React, { useState, useEffect } from "react";

import activityApi from "../../../api/activity";
import ActivityList from "./ActivityList";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    activityApi.getActivities().then((data) => {
      setActivities(data);
    });
  }, [refresh]);

  return (
    <div className="">
      <ActivityList
        activities={activities}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Activity;
