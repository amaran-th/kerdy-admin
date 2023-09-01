import React, { useState, useEffect } from "react";

const ActivityList = ({ activities }) => {
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
                    className="rounded-lg border bg-red-300 p-2 text-white hover:bg-red-400"
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
