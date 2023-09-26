import React, { useState, useEffect } from "react";

import activityApi from "../../../api/activity";
import ActivityList from "./ActivityList";
import { connect } from "react-redux";

const Activity = ({ state }) => {
  const [activities, setActivities] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    activityApi.getActivities(state.envType.envType).then((data) => {
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

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Activity);
