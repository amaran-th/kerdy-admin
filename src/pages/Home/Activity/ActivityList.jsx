import React, { useState, useEffect } from "react";
import activityApi from "../../../api/activity";
import { activityTypes } from "../../../data";
import { connect } from "react-redux";

const ActivityList = ({ activities, refresh, setRefresh, state }) => {
  const [newActivity, setNewActivity] = useState({});

  const handleSubmit = (type) => {
    activityApi
      .addActivity({
        name: newActivity[type],
        activityType: activityTypes[type],
        envType: state.envType.envType
      })
      .then((data) => {
        setRefresh(!refresh);
      });
  };
  const groupedActivity = () => {
    return activities.reduce((acc, curr) => {
      const { activityType } = curr;
      if (acc[activityType]) acc[activityType].push(curr);
      else acc[activityType] = [curr];
      return acc;
    }, []);
  }

  const getActivityTypes = () => {
    return [...new Set(activities.map(activity => {
      return activity.activityType
    }))]
  }

  return (
    <table className="w-full border-2 border-green-300">
      <thead className="bg-green-300 text-white">
        <th>id</th>
        <th>이름</th>
        <th>삭제하기</th>
      </thead>
      <tbody>
        {console.log(getActivityTypes())}
        {console.log(activities)}
        {getActivityTypes().map((type) => (
          <>
            <tr>
              <td className="bg-green-50 p-2" colspan={4}>
                <span className="text-lg font-bold text-green-300">
                  {type}
                </span>
                <form className="mx-4 inline-block">
                  <input
                    type="text"
                    className="border border-black"
                    value={newActivity[type]}
                    onChange={(e) => {
                      setNewActivity({
                        ...newActivity,
                        [type]: e.target.value,
                      });
                    }}
                    required
                  />
                  <button
                    className="ml-2 w-[6em] rounded-xl bg-green-300 p-1 px-2 text-sm text-white"
                    type="button"
                    onClick={() => handleSubmit(type)}
                  >
                    추가하기
                  </button>
                </form>
              </td>
            </tr>
            {console.log(groupedActivity())}
            {groupedActivity()[type]?.map((activitiyResponse) => (
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

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(ActivityList);
