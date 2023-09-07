import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";

function App() {
  const [type, setType] = useState("EVENT");
  return (
    <>
      <div>
        <div className="font-basic dark:bg-black dark:text-white">
          <MainLayout type={type} setType={setType}>
            <Home type={type} />
          </MainLayout>
        </div>
      </div>
    </>
  );
}

export default App;
