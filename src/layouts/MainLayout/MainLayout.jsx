import React from "react";
import Side from "../../pages/Side/Side";

const MainLayout = ({ type, setType, children }) => {
  return (
    <>
      <div className="mb-4 flex w-full">
        <Side type={type} setType={setType} />
        <div className="w-full">{children}</div>
      </div>
      <footer className="h-[300px] w-full bg-green-100"></footer>
    </>
  );
};

export default MainLayout;
