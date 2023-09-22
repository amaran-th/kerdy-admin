import React, { useState, useEffect } from "react";
import { dateParser } from "../../../util";
import eventApi from "../../../api/event";

const EventList = ({ events, refresh, setRefresh, setSelectedEvent }) => {
  const handleEventDelete = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      eventApi.removeEvent({ id }).then((data) => {
        setRefresh(!refresh);
      });
    }
  };

  return (
    <table className="w-full border-2 border-green-300">
      <thead className="bg-green-300 text-white">
        <th>id</th>
        <th>이미지</th>
        <th>이름</th>
        <th>태그 목록</th>
        <th>행사 기간</th>
        <th>주최 기관</th>
        <th>수정/삭제</th>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr id={event.id} className="border-2 border-green-300">
            <td>{event.id}</td>
            <td>
              <img className="h-24 w-24" src={event.imageUrl} />
            </td>
            <td>{event.name}</td>
            <td>
              <div className="mb-2">
                <span className="m-1 rounded-full bg-yellow-300 p-1 px-2 text-xs">
                  {event.paymentType}
                </span>
                <span className="m-1 rounded-full bg-blue-300 p-1 px-2 text-xs">
                  {event.eventMode}
                </span></div>
              {event.tags?.map((tag) => (
                <span className="m-1 rounded-full bg-gray-300 p-1 px-2 text-xs">
                  {tag}
                </span>
              ))}
            </td>
            <td>
              {dateParser(event.startDate)}~
              <br />
              {dateParser(event.endDate)}
            </td>
            <td>
              {event.organization}
            </td>
            <td className="flex items-center justify-center">
              <button
                className="rounded-lg border bg-blue-300 p-2 text-white hover:bg-blue-400"
                onClick={() => {
                  eventApi.getEvent(event.id).then((data) => {
                    setSelectedEvent(data);
                    setRefresh(!refresh);
                  });
                }}
              >
                수정하기
              </button>
              <button
                className="rounded-lg border bg-red-300 p-2 text-white hover:bg-red-400"
                onClick={() => {
                  handleEventDelete(event.id);
                }}
              >
                삭제하기
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventList;
