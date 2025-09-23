import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// Layouts
import DefaultLayout from "./layouts/DefaultLayouts";
// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";


function AppRoutes() {
  const location = useLocation();
 

  useEffect(() => {
    if (
      location.pathname === "/home" &&
      sessionStorage.getItem("fromWelcome") === "true"
    ) {
      setShowTransition(true);
      sessionStorage.removeItem("fromWelcome");
    }
  }, [location.pathname]);


  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<DefaultLayout />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
