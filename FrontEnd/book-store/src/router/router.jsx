import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import RegistrationForm from "../pages/Registration";
import Dashboard from "../pages/dashboard";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ProtectedRoute from "../router/ProtectedRoute"; // 👈 import this

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RegistrationForm />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addbook"
        element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editprofile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
