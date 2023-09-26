import React, { useState, useEffect } from "react";

import tagApi from "../../../api/tag";
import TagList from "./TagList";
import { connect } from "react-redux";

const Tag = ({ state }) => {
  const [tags, setTags] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const { envType } = state.envType;


  useEffect(() => {
    tagApi.getTags(envType).then((data) => {
      setTags(data);
    });
  }, [refresh]);

  const handleSubmit = () => {
    tagApi.addTag({ name: newTagName, envType }).then((data) => {
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

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Tag);
