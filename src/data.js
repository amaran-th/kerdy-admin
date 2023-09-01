import Tag from "./pages/Home/Tag/Tag";
import Event from "./pages/Home/Event/Event";
import Report from "./pages/Home/Report/Report";
import Activity from "./pages/Home/Activity/Activity";

export const types = {
  EVENT: <Event />,
  TAG: <Tag />,
  ACTIVITY: <Activity />,
  REPORT: <Report />,
};

export const activityTypes = {
  동아리: "CLUB",
  직무: "JOB",
  컨퍼런스: "CONFERENCE",
  교육: "EDUCATION",
};
