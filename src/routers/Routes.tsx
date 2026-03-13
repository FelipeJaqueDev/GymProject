import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../index.css'
import Landing from "@/pages/PagesLanding/Landing";
import Login from "@/pages/PagesLogin/Login";
import ResetScroll from '../ResetScroll'
import ContactWrapper from "@/pages/PagesContact/ContactWrapper";
import Plans from "@/pages/PagesPlans/Plans";
import AboutUs from "@/pages/PagesAboutUs/AboutUs";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ResetScroll />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactWrapper />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);