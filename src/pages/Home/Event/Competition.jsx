import React, { useEffect } from "react";

import EventAppender from "./EventAppender";
import eventApi from "../../../api/event";
import EventList from "./EventList";

const Competition = ({ events, setEvents, refresh, setRefresh }) => {
  useEffect(() => {
    eventApi.getCompetition().then((data) => {
      setEvents(data);
    });
  }, [refresh]);

  return (
    <div>
      <EventList events={events} refresh={refresh} setRefresh={setRefresh} />
      <EventAppender
        refresh={refresh}
        setRefresh={setRefresh}
        type="COMPETITION"
      />
    </div>
  );
};

export default Competition;
