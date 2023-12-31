import React, { useState, useEffect } from "react";

import eventApi from "../../../api/event";
import tagApi from "../../../api/tag";
import ImagesUploader from "./ImagesUploader"
import { connect } from "react-redux";

const defaultDateTime = new Date().toISOString().slice(0, 10) + "T00:00:00";

const EventAppender = ({ refresh, setRefresh, type, state }) => {
  const [tags, setTags] = useState([]);
  const [newData, setNewData] = useState({
    name: "",
    location: "",
    informationUrl: "",
    startDateTime: defaultDateTime,
    endDateTime: defaultDateTime,
    applyStartDateTime: defaultDateTime,
    applyEndDateTime: defaultDateTime,
    paymentType: "FREE",
    eventMode: "OFFLINE",
    organization: "",
  });
  const [newTags, setNewTags] = useState([]);
  const [informationImages, setInformationImages] = useState([]);
  const [isLoading, setPreventClick] = useState(false);
  const { envType } = state.envType;
  const { token } = state.token;

  useEffect(() => {
    tagApi.getTags(envType).then((data) => {
      setTags(data);
    });
  }, [refresh, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // event.stopPropagation();
    setPreventClick(!isLoading);
    var images = informationImages;
    await eventApi.addEvent({ newData, newTags, type, images, envType, token });
    setPreventClick(false);
    setRefresh(!refresh);
  };
  const addTag = (tag) => {
    setNewTags([...newTags, { name: tag.name }]);
  };
  const deleteTag = (tag) => {
    const updatedTags = newTags.filter((newTag) => newTag.name !== tag.name);
    setNewTags(updatedTags);
  };

  const isIncludeTag = (tag) => {
    return newTags.filter((newTag) => newTag.name === tag.name).length !== 0;
  };
  return (
    <form
      className="rounded-md border border-black p-2"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center space-x-4">
        <div>
          <div>
            <div className="inline-block min-w-[8em] p-2 text-center">
              행사명
            </div>
            <input
              type="text"
              className="border border-black"
              value={newData.name}
              onChange={(e) => {
                setNewData({ ...newData, name: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <div className="inline-block min-w-[8em] p-2 text-center">장소</div>
            <input
              type="text"
              className="border border-black"
              value={newData.location}
              onChange={(e) => {
                setNewData({ ...newData, location: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <div className="inline-block min-w-[8em] p-2 text-center">주최 기관</div>
            <input
              type="text"
              className="border border-black"
              value={newData.organization}
              onChange={(e) => {
                setNewData({ ...newData, organization: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <div className="inline-block min-w-[8em] p-2 text-center">
              행사 URL
            </div>
            <input
              type="text"
              className="border border-black"
              value={newData.informationUrl}
              onChange={(e) => {
                setNewData({ ...newData, informationUrl: e.target.value });
              }}
              required
            />
          </div>

          <div>
            <div className="inline-block min-w-[8em] p-2 text-center">
              신청 기간
            </div>
            <input
              type="datetime-local"
              className="border border-black"
              value={newData.applyStartDateTime}
              onChange={(e) => {
                setNewData({
                  ...newData,
                  applyStartDateTime: e.target.value,
                });
              }}
              required
            />
            <div className="inline-block min-w-[8em] p-2 text-center">~</div>
            <input
              type="datetime-local"
              className="border border-black"
              value={newData.applyEndDateTime}
              onChange={(e) => {
                setNewData({ ...newData, applyEndDateTime: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <div className="inline-block min-w-[8em] p-2 text-center">
              행사 기간
            </div>
            <input
              type="datetime-local"
              className="border border-black"
              value={newData.startDateTime}
              onChange={(e) => {
                setNewData({ ...newData, startDateTime: e.target.value });
              }}
              required
            />
            <div className="inline-block min-w-[8em] p-2 text-center">~</div>
            <input
              type="datetime-local"
              className="border border-black"
              value={newData.endDateTime}
              onChange={(e) => {
                setNewData({ ...newData, endDateTime: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <div className="inline-block min-w-[8em] p-2 text-center">
              유/무료
            </div>
            <select className="border border-black w-40" onChange={(e) => {
              setNewData({ ...newData, paymentType: e.target.value })
            }}
              value={newData.paymentType}>
              <option value="FREE">무료</option>
              <option value="PAID">유료</option>
              <option value="FREE_PAID">유무료</option>
            </select>
          </div>
          <div>
            <div className="inline-block min-w-[8em] p-2 text-center">
              온/오프라인
            </div>
            <select className="border border-black w-40" onChange={(e) => {
              setNewData({ ...newData, eventMode: e.target.value })
            }}
              value={newData.eventMode}>
              <option value="OFFLINE">오프라인</option>
              <option value="ONLINE">온라인</option>
              <option value="ON_OFFLINE">온/오프라인</option>
            </select>
          </div>
          <div className="flex">
            <div className="inline-block min-w-[8em] p-2 text-center">태그</div>
            <div className="flex flex-wrap">
              {tags?.map((tag) => (
                <span
                  className={
                    (isIncludeTag(tag) ? "bg-green-300 text-white" : "") +
                    " m-1 flex items-center rounded-full border-2 border-green-300 p-1 px-2 text-xs"
                  }
                  onClick={() => {
                    if (isIncludeTag(tag)) {
                      deleteTag(tag);
                    } else {
                      addTag(tag);
                    }
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <ImagesUploader title="상세 정보 이미지들" informationImages={informationImages} setInformationImages={setInformationImages} />
        </div>
      </div>
      <div className="flex-center flex justify-center gap-4">
        <button
          className={(isLoading ? "bg-gray-200" : "") + " w-[10em] rounded-md bg-green-300 p-2 text-white"}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? '저장 중 ' : "추가하기"}
        </button>
      </div>
    </form >
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(EventAppender);
