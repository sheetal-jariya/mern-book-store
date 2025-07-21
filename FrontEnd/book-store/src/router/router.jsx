import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import RegistrationForm from "../pages/Registration";
import Dashboard from "../pages/dashboard";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ProtectedRoute from "../router/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import CartPage from "../pages/CartPage";

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
      <Route
        path="/forgot-password"
        element={
            <ForgotPassword />
        }
      />
       <Route
        path="/reset-password"
        element={
            <ResetPassword />
        }
      />
 <Route
        path="/cart"
        element={
            <CartPage />
        }
      />
    </Routes>
  );
};

export default UserRoutes;
