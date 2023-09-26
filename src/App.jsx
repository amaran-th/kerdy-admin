import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import actionEnvType from "./redux/action/envType";

function App({ state, changeEnvType }) {
  const [type, setType] = useState("EVENT");
  const [refresh, setRefresh] = useState(false);
  const { envType } = state.envType
  const getNewEnvType = () => {
    if (envType === "local") return 'dev'
    if (envType === 'dev') return 'prod'
    if (envType === 'prod') return 'local'
  }

  const handleChangeEnvType = () => {
    changeEnvType(getNewEnvType());
    window.location.reload();
  }

  return (
    <>
      <div>
        <div className="font-basic dark:bg-black dark:text-white">
          <div className=" p-4 text-2xl">Kerdy 관리자 페이지<button onClick={() => { handleChangeEnvType() }} className="text-white text-xl m-2 bg-gray-600 px-4 p-1 rounded-full">{envType}</button></div>
          <MainLayout type={type} setType={setType}>
            <Home type={type} />
          </MainLayout>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    changeEnvType: (envType) => {
      dispatch(actionEnvType.updateCurrent(envType));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
