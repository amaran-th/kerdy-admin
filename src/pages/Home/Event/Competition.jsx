import React, { useEffect } from "react";

import EventAppender from "./EventAppender";
import eventApi from "../../../api/event";
import EventList from "./EventList";
import { connect } from "react-redux";

const Competition = ({
  events,
  setEvents,
  refresh,
  setRefresh,
  setSelectedEvent,
  state
}) => {
  useEffect(() => {
    eventApi.getCompetition(state.envType.envType).then((data) => {
      setEvents(data);
    });
  }, [refresh]);

  return (
    <div>
      <EventAppender
        refresh={refresh}
        setRefresh={setRefresh}
        type="COMPETITION"
      />
      <EventList
        events={events}
        refresh={refresh}
        setRefresh={setRefresh}
        setSelectedEvent={setSelectedEvent}
      />
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Competition);
