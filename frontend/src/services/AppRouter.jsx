import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Barcode from "../pages/Barcode";
import Fabric from "../pages/Fabric";
import Login from "../pages/login"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barcode" element={<Barcode />} />
        <Route path="/fabric" element={<Fabric />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;