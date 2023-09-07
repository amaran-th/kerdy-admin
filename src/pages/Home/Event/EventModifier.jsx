import React, { useState, useEffect } from "react";

import eventApi from "../../../api/event";
import tagApi from "../../../api/tag";
const EventModifier = ({ event, setEvent, refresh, setRefresh }) => {
  const [tags, setTags] = useState([]);
  const [newData, setNewData] = useState({
    name: event.name,
    location: event.location,
    imageUrl: event.imageUrl,
    informationUrl: event.informationUrl,
    startDateTime: "",
    endDateTime: "",
    applyStartDateTime: "",
    applyEndDateTime: "",
    type: event.type,
  });
  const [newTags, setNewTags] = useState(
    event.tags?.map((tag) => {
      return { name: tag };
    })
  );

  useEffect(() => {
    tagApi.getTags().then((data) => {
      setTags(data);
    });
    if (Object.keys(event).length !== 0) {
      setNewData({
        name: event.name,
        location: event.location,
        imageUrl: event.imageUrl,
        informationUrl: event.informationUrl,
        startDateTime: "",
        endDateTime: "",
        applyStartDateTime: "",
        applyEndDateTime: "",
        type: event.type,
      });
      setNewTags(
        event.tags?.map((tag) => {
          return { name: tag };
        })
      );
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    eventApi.modifyEvent({ newData, newTags, id: event.id }).then((data) => {
      if (!data.message) {
        alert("정상적으로 수정되었습니다.");
        setEvent({});
        setRefresh(!refresh);
      }
    });
  };
  const addTag = (tag) => {
    setNewTags([...newTags, { name: tag.name }]);
  };
  const deleteTag = (tag) => {
    const updatedTags = newTags.filter((newTag) => newTag.name !== tag.name);
    setNewTags(updatedTags);
  };

  const isIncludeTag = (tag) => {
    return newTags?.filter((newTag) => newTag.name === tag.name).length !== 0;
  };
  return (
    <div className="fixed top-0 left-0 z-[99] flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70">
      <form
        className="rounded-md border border-black bg-white p-2"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <img className="h-40 w-40 border" src={newData.imageUrl} />
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
              <div className="inline-block min-w-[8em] p-2 text-center">
                장소
              </div>
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
              <div className="inline-block min-w-[8em] p-2 text-center">
                이미지 URL
              </div>
              <input
                type="text"
                className="border border-black"
                value={newData.imageUrl}
                onChange={(e) => {
                  setNewData({ ...newData, imageUrl: e.target.value });
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
                행사 기간
              </div>
              <input
                type="datetime-local"
                className="border border-black"
                value={newData.startDateTime}
                onChange={(e) => {
                  setNewData({ ...newData, startDateTime: e.target.value });
                  console.log(newData);
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
            {/* <div>
              <div className="inline-block min-w-[8em] p-2 text-center">
                행사 유형
              </div>
              <select
                className="border border-black"
                value={newData.type}
                onChange={(e) => {
                  setNewData({ ...newData, type: e.target.value });
                }}
              >
                <option value="CONFERENCE">컨퍼런스</option>
                <option value="COMPETITION">대회</option>
              </select>
            </div> */}
            <div className="flex">
              <div className="inline-block min-w-[8em] p-2 text-center">
                태그
              </div>
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
          </div>
        </div>
        <div className="flex-center flex justify-center gap-4">
          <button
            className="w-[10em] rounded-md bg-green-300 p-2 text-white"
            type="submit"
          >
            수정하기
          </button>

          <button
            className="w-[10em] rounded-md bg-gray-500 p-2 text-white"
            onClick={() => {
              setEvent({});
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventModifier;
