import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/main";

import "./ui/index.scss";
import WelcomePage from "../pages/home/ui/WelcomePage";
import Authorize from "../pages/sign-in-up/ui/Authorize";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/welcome" Component={WelcomePage} />
        <Route path="/auth" Component={Authorize} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;