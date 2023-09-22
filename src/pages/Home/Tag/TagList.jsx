import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const TagList = ({ tags }) => {
  return (
    <table className="w-full border-2 border-green-300">
      <thead className="bg-green-300 text-white">
        <th>id</th>
        <th>이름</th>
        <th>삭제하기</th>
      </thead>
      <tbody>
        {tags.map((tag) => (
          <tr id={tag.id} className="border-2 border-green-300">
            <td>{tag.id}</td>
            <td>{tag.name}</td>

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
      </tbody>
    </table>
  );
};

export default TagList;
