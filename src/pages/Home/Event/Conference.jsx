import React, { useEffect } from "react";

import eventApi from "../../../api/event";
import EventAppender from "./EventAppender";
import EventList from "./EventList";

const Conference = ({ events, setEvents, refresh, setRefresh }) => {
  useEffect(() => {
    eventApi.getConference().then((data) => {
      setEvents(data);
    });
  }, [refresh]);

  return (
    <div>
      <EventList events={events} refresh={refresh} setRefresh={setRefresh} />
      <EventAppender
        refresh={refresh}
        setRefresh={setRefresh}
        type="CONFERENCE"
      />
    </div>
  );
};

export default Conference;
