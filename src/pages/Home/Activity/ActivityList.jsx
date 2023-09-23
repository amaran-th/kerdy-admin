import React, { useState, useEffect } from "react";
import activityApi from "../../../api/activity";
import { activityTypes } from "../../../data";

const ActivityList = ({ activities, refresh, setRefresh }) => {
  const [newActivity, setNewActivity] = useState({});

  const handleSubmit = (type) => {
    activityApi
      .addActivity({
        name: newActivity[type],
        activityType: activityTypes[type],
      })
      .then((data) => {
        setRefresh(!refresh);
      });
  };

  return (
    <table className="w-full border-2 border-green-300">
      <thead className="bg-green-300 text-white">
        <th>id</th>
        <th>이름</th>
        <th>삭제하기</th>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <>
            <tr>
              <td className="bg-green-50 p-2" colspan={4}>
                <span className="text-lg font-bold text-green-300">
                  {activity.activityType}
                </span>
                <form className="mx-4 inline-block">
                  <input
                    type="text"
                    className="border border-black"
                    value={newActivity[activity.activityType]}
                    onChange={(e) => {
                      setNewActivity({
                        ...newActivity,
                        [activity.activityType]: e.target.value,
                      });
                    }}
                    required
                  />
                  <button
                    className="ml-2 w-[6em] rounded-xl bg-green-300 p-1 px-2 text-sm text-white"
                    type="button"
                    onClick={() => handleSubmit(activity.activityType)}
                  >
                    추가하기
                  </button>
                </form>
              </td>
            </tr>
            {activity.activityResponses?.map((activitiyResponse) => (
              <tr
                id={activitiyResponse.id}
                className="border-2 border-green-300"
              >
                <td className="flex justify-center">{activitiyResponse.id}</td>
                <td>{activitiyResponse.name}</td>
                <td className="flex justify-center">
                  <button
                    className="rounded-lg border bg-gray-400 p-2 text-white hover:bg-red-400"
                    onClick={() => {
                      console.log("삭제");
                    }}
                  >
                    삭제하기
                  </button>
                </td>
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default ActivityList;
