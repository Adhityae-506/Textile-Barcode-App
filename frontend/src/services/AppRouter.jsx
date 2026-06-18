import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import Home from "../pages/Home";
import Barcode from "../pages/Barcode";
import Fabric from "../pages/Fabric";
import Login from "../pages/Login";
import Dispatch from "../pages/Dispatch";
import CreateDispatch from "../pages/CreateDispatch";
import DispatchRolls from "../pages/DispatchRolls";
import Stocks from "../pages/Stocks";
import DispatchPreview from "../pages/DispatchPreview";

import DispatchDC from "../components/dispatch/DispatchDC";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Route */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/barcode"
            element={<Barcode />}
          />

          <Route
            path="/stocks"
            element={<Stocks />}
          />

          <Route
            path="/fabric"
            element={<Fabric />}
          />

          <Route
            path="/dispatch"
            element={<Dispatch />}
          />

          <Route
            path="/dispatch-list"
            element={<CreateDispatch />}
          />

          <Route
            path="/dispatch/scan"
            element={<DispatchRolls />}
          />

          <Route
            path="/dispatch/preview"
            element={<DispatchPreview />}
          />

          <Route
            path="/dispatch/:id"
            element={<DispatchDC />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;
