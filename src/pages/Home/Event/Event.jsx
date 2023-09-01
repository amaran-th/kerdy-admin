import React, { useState, useEffect } from "react";
import Conference from "./Conference";
import Competition from "./Competition";

const Event = () => {
  const [eventType, setEventType] = useState("CONFERENCE");
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
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
        />
      ) : (
        <Competition
          events={events}
          setEvents={setEvents}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default Event;
