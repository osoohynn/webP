import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainApp from "./components/MainApp"
import SummaryPage from "./components/SummaryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}