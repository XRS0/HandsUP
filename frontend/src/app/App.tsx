import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../pages/main";

import "./ui/index.scss";
import WelcomePage from "@/pages/home/WelcomePage";
import Authorize from "@/pages/sign-in-up/Authorize";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" Component={WelcomePage} />
        <Route path="/auth" Component={Authorize} />
        <Route path="/" Component={MainPage} />
        <Route path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;