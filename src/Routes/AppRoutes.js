import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import DashboardRoutes from "./DashboardRoutes";
import PrivateRoutes from "./PrivateRoutes";

function AppRoutes() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, [auth]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/MarketLogic-PT/login" element={<Login />} />
        <Route path="/MarketLogic-PT/register" element={<Register />} />
        <Route
          path="/MarketLogic-PT/*"
          element={
            <PrivateRoutes isAuth={auth}>
              <DashboardRoutes />
            </PrivateRoutes>
          }
        />
        <Route path="/*" element={<Navigate to="/MarketLogic-PT/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
