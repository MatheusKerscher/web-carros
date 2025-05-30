import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Dashboard from "./pages/Dashboard";

import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import CarForm from "./pages/Dashboard/CarForm";
import AuthProvider from "./context/AuthContext";
import Private from "./routes/Private";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/car-details/:carId" element={<CarDetails />} />

            <Route
              path="/dashboard"
              element={
                <Private>
                  <DashboardLayout />
                </Private>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="new-car" element={<CarForm />} />
              <Route path="edit-car/:carId" element={<CarForm />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
