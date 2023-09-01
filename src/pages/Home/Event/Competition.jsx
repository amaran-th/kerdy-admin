import React, { useEffect } from "react";

import EventAppender from "./EventAppender";
import eventApi from "../../../api/event";
import EventList from "./EventList";

const Competition = ({
  events,
  setEvents,
  refresh,
  setRefresh,
  setSelectedEvent,
}) => {
  useEffect(() => {
    eventApi.getCompetition().then((data) => {
      setEvents(data);
    });
  }, [refresh]);

  return (
    <div>
      <EventList
        events={events}
        refresh={refresh}
        setRefresh={setRefresh}
        setSelectedEvent={setSelectedEvent}
      />
      <EventAppender
        refresh={refresh}
        setRefresh={setRefresh}
        type="COMPETITION"
      />
    </div>
  );
};

export default Competition;
