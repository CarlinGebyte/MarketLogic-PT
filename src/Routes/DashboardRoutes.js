import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Add from "../Components/Add";
import Menu from "../Components/Menu";
import MobileMenu from "../Components/MobileMenu";
import Overview from "../Components/Overview";

function DashboardRoutes() {
  return (
    <div>
      <div className="dash_menu">
        <Menu />
        <MobileMenu />
      </div>
      <div className="dash_routes">
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/Overview" element={<Overview />} />
          <Route
            path="/*"
            element={<Navigate to="/MarketLogic-PT/Overview" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardRoutes;
