import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { types } from "../../data";

const Side = ({ type, setType }) => {
  return (
    <div className="flex min-w-[10rem] flex-col gap-4 p-2">
      {Object.keys(types).map((item) => (
        <button
          className={
            (type === item ? "bg-green-400 text-white" : "bg-gray-300") +
            " rounded-md border p-2"
          }
          onClick={() => {
            setType(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Side;
