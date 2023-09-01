import React, { useState, useEffect } from "react";
import Conference from "./Conference";
import Competition from "./Competition";
import EventModifier from "./EventModifier";

const Event = () => {
  const [eventType, setEventType] = useState("CONFERENCE");
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  useEffect(() => {}, [selectedEvent]);

  const eventModifier = () => (
    <EventModifier
      event={selectedEvent}
      setEvent={setSelectedEvent}
      refresh={refresh}
      setRefresh={setRefresh}
    />
  );

  return (
    <div>
      {Object.keys(selectedEvent).length !== 0 ? eventModifier() : ""}

      <div className="flex p-2">
        <button
          className={
            (eventType === "CONFERENCE" ? "border-green-300" : "") +
            " mx-2 flex w-[6em] justify-center rounded-full border-4 p-2"
          }
          onClick={() => {
            setEventType("CONFERENCE");
          }}
        >
          컨퍼런스
        </button>
        <button
          className={
            (eventType === "COMPETITION" ? "border-green-300" : "") +
            " mx-2 flex w-[6em] justify-center rounded-full border-4 p-2"
          }
          onClick={() => {
            setEventType("COMPETITION");
          }}
        >
          대회
        </button>
      </div>
      {eventType === "CONFERENCE" ? (
        <Conference
          events={events}
          setEvents={setEvents}
          refresh={refresh}
          setRefresh={setRefresh}
          setSelectedEvent={setSelectedEvent}
        />
      ) : (
        <Competition
          events={events}
          setEvents={setEvents}
          refresh={refresh}
          setRefresh={setRefresh}
          setSelectedEvent={setSelectedEvent}
        />
      )}
    </div>
  );
};

export default Event;
