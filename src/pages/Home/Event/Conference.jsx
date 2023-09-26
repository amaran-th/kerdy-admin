import React, { useEffect } from "react";

import eventApi from "../../../api/event";
import EventAppender from "./EventAppender";
import EventList from "./EventList";
import { connect } from "react-redux";

const Conference = ({
  events,
  setEvents,
  refresh,
  setRefresh,
  setSelectedEvent,
  state,
}) => {
  useEffect(() => {
    eventApi.getConference(state.envType.envType).then((data) => {
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
        type="CONFERENCE"
      />
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Conference);
