import React, { useState, useEffect } from "react";

import tagApi from "../../../api/tag";
import TagList from "./TagList";

const Tag = () => {
  const [tags, setTags] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    tagApi.getTags().then((data) => {
      setTags(data);
    });
  }, [refresh]);

  return (
    <div>
      <TagList tags={tags} />
    </div>
  );
};

export default Tag;
