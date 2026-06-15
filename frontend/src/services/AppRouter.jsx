import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Barcode from "../pages/Barcode";
import Fabric from "../pages/Fabric";
import Login from "../pages/login"
import CreateDispatch from "../pages/CreateDispatch";
import DispatchRolls from "../pages/DispatchRolls";
import DispatchPreview from "../pages/DispatchPreview";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barcode" element={<Barcode />} />
        <Route path="/fabric" element={<Fabric />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dispatch" element={<CreateDispatch/>} />
        <Route path="/dispatch/scan" element={<DispatchRolls />} />
        <Route path="/dispatch/preview" element={<DispatchPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;