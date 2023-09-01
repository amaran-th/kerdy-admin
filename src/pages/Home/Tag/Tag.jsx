import React, { useState, useEffect } from "react";

import tagApi from "../../../api/tag";
import TagList from "./TagList";

const Tag = () => {
  const [tags, setTags] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    tagApi.getTags().then((data) => {
      setTags(data);
    });
  }, [refresh]);

  const handleSubmit = () => {
    tagApi.addTag({ name: newTagName }).then((data) => {
      console.log(data);
      setRefresh(!refresh);
    });
  };

  return (
    <div>
      <TagList tags={tags} />
      <input
        type="text"
        className="border border-black"
        value={newTagName}
        onChange={(e) => {
          setNewTagName(e.target.value);
        }}
        required
      />
      <button
        className="ml-2 w-[6em] rounded-xl bg-green-300 p-1 px-2 text-sm text-white"
        type="button"
        onClick={() => handleSubmit()}
      >
        추가하기
      </button>
    </div>
  );
};

export default Tag;
