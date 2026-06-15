import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Barcode from "../pages/Barcode";
import Fabric from "../pages/Fabric";
import Login from "../pages/login"
import Dispatch from "../pages/Dispatch";
import CreateDispatch from "../pages/CreateDispatch";
import DispatchRolls from "../pages/DispatchRolls";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barcode" element={<Barcode />} />
        <Route path="/fabric" element={<Fabric />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dispatch" element={<Dispatch />} />
        <Route path="/dispatch-list" element={<CreateDispatch/>} />
        <Route path="/dispatch/scan" element={<DispatchRolls />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

