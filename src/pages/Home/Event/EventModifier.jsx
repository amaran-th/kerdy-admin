import React, { useState, useEffect } from "react";

import eventApi from "../../../api/event";
import tagApi from "../../../api/tag";
import { dateParser2 } from "../../../util";
import ThumbnailUploader from "./ThumbnailUploader";
import ImagesUploader from "./ImagesUploader"

const EventModifier = ({ event, setEvent, refresh, setRefresh }) => {
  const [tags, setTags] = useState([]);
  const [newData, setNewData] = useState({
    name: event.name,
    location: event.location,
    informationUrl: event.informationUrl,
    startDateTime: "",
    endDateTime: "",
    applyStartDateTime: "",
    applyEndDateTime: "",
    imageUrl: event.imageUrl,
    type: event.type,
    paymentType: event.paymentType,
    eventMode: event.eventMode,
    organization: event.organization
  });
  const [newTags, setNewTags] = useState(
    event.tags?.map((tag) => {
      return { name: tag };
    })
  );
  const [thumbnail, setThumbnail] = useState(null);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    tagApi.getTags().then((data) => {
      setTags(data);
    });

    if (Object.keys(event).length !== 0) {
      setNewData({
        name: event.name,
        location: event.location,
        informationUrl: event.informationUrl,
        startDateTime: dateParser2(event.startDate),
        endDateTime: dateParser2(event.endDate),
        applyStartDateTime: dateParser2(event.applyStartDate),
        applyEndDateTime: dateParser2(event.applyEndDate),
        imageUrl: event.imageUrl,
        type: event.type,
        paymentType: event.paymentType,
        eventMode: event.eventMode,
        organization: event.organization
      });
      setNewTags(
        event.tags?.map((tag) => {
          return { name: tag };
        })
      );
      setThumbnail(null);
      setNewImages([]);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var images = thumbnail ? [thumbnail, ...newImages] : newImages;
    eventApi.modifyEvent({ newData, newTags, id: event.id, images }).then((data) => {
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
          <ThumbnailUploader title="섬네일" setThumbnail={setThumbnail} />
          <div>
            <div>
              <div className="inline-block min-w-[8em] p-2 text-center">
                섬네일 URL(추후 삭제 예정)
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
              <img className="inline-block h-40 w-40 border" src={newData.imageUrl} />
            </div>
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
            <ImagesUploader title="상세 정보 이미지들" informationImages={newImages} setInformationImages={setNewImages} />
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
