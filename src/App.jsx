import React, { Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import actionEnvType from "./redux/action/envType";
import actionToken from "./redux/action/token";
import Login from "./pages/Login/Login";


function App({ state, changeEnvType, changeLoginToken }) {
  const [type, setType] = useState("EVENT");
  const [isLogin, setIsLogin] = useState(false);
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

  const handleLogout = () => {
    changeLoginToken('');
    setIsLogin(false);
    setRefresh(!refresh)
  }

  useEffect(() => {

  }, [refresh, state]);

  return (
    <>
      <div>
        <div className="font-basic dark:bg-black dark:text-white">
          <Login isLogin={isLogin} setIsLogin={setIsLogin} />
          <div className="flex justify-between w-[100vw] bg-gray-100 items-center">
            <div className=" p-4 text-2xl">Kerdy 관리자 페이지<button onClick={() => { handleChangeEnvType() }} className="text-white text-xl m-2 bg-gray-600 px-4 p-1 rounded-full">{envType}</button></div>
            <button onClick={() => { handleLogout() }} className="bg-red-300 text-white p-2 mx-4 rounded-md hover:bg-red-400"> 로그아웃 </button>
          </div>
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
    changeLoginToken: (token) => {
      dispatch(actionToken.setToken(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
