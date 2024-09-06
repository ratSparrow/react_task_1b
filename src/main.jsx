import { Navigate, Route, Routes } from "react-router-dom";

import AdminDashboardPage from "Pages/AdminDashboardPage";
import AdminListReceipts from "Pages/AdminListReceipts";
import AdminLoginPage from "Pages/AdminLoginPage";
import { AuthContext } from "Context/Auth";
import NotFoundPage from "Pages/NotFoundPage";
import React from "react";
import SnackBar from "Components/SnackBar";

function renderRoutes(role) {
  console.log("admin", role);

  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
          <Route
            exact
            path="/admin/receipt"
            element={<AdminListReceipts />}
          ></Route>
        </Routes>
      );
      break;
    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>

          {/* <Route path="*" exact element={<NotFoundPage />}></Route> */}
        </Routes>
      );
      break;
  }
}

function Main() {
  const { state } = React.useContext(AuthContext);
  console.log( state);

  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="page-wrapper w-full py-10 px-5">
            {!state.isAuthenticated
              ? renderRoutes("none")
              : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
