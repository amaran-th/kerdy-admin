import React, { useState, useEffect } from "react";
import { dateParser } from "../../../util";

const ReportList = ({ reports }) => {
  return (
    <table className="w-full border-2 border-green-300">
      <thead className="bg-green-300 text-white">
        <th>id</th>
        <th>신고자 ID</th>
        <th>신고 대상자 ID</th>
        <th>컨텐츠 유형</th>
        <th>컨텐츠 ID</th>
        <th>신고 일자</th>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr id={report.id} className="border-2 border-green-300">
            <td>{report.id}</td>
            <td>{report.reporterId}</td>
            <td>{report.reportedId}</td>
            <td>{report.type}</td>
            <td>{report.contentId}</td>
            <td>
              {report.createdAt ? dateParser(report.createdAt) : "입력없음"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportList;
