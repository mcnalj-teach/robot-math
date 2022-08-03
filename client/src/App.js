import React from "react";
import './App.scss';
import './index.scss';
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import Splash from "./components/splash";
import LoggedIn from "./components/logged-in";
// import Exponents from "./components/exponents";
import UnitCircle from "./components/unit-circle";
import QuestionBase from "./components/question-base";
import Integrals from "./components/integrals";
import Field from "./components/Field";

export default function App() {
  return (
    <div>
      <NavBar />
      <div id="htmlBody" className="container">
        <Routes>
          <Route exact path="/" element={<Splash />} />
          <Route path="/logged-in" element={<LoggedIn />} />
          <Route path="/unit-circle" element={<UnitCircle />} />
          <Route path="/question-base/:id" element={<QuestionBase />} />
          <Route path="/integrals" element={<Integrals />} />
          <Route path="/field" element={<Field />} />
        </Routes>
      </div>
    </div>
  );
}
