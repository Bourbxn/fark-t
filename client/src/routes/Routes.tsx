import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import EditFark from "../pages/EditFark";
import EditOrder from "../pages/EditOrder";
import EditProfile from "../pages/EditProfile";
import History from "../pages/History";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyFark from "../pages/MyFark";
import MyOrder from "../pages/MyOrder";
import MyOrderDetails from "../pages/MyOrderDetails";
import NewFark from "../pages/NewFark";
import NewOrder from "../pages/NewOrder";
import Register from "../pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/myorder"
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myorder/:id"
          element={
            <ProtectedRoute>
              <MyOrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/edit/:id"
          element={
            <ProtectedRoute>
              <EditOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fark"
          element={
            <ProtectedRoute>
              <MyFark />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fark/edit/:id"
          element={
            <ProtectedRoute>
              <EditFark />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <NewFark />
            </ProtectedRoute>
          }
        />
        <Route
          path="/neworder"
          element={
            <ProtectedRoute>
              <NewOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
