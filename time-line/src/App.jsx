import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ConfirmEmailPage from "./pages/ConfirmEmailPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";

export default function App() {
  return (
  
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} /> 
        <Route path="/dashboard" element={ <ProtectedRoute> <DashboardPage /> </ProtectedRoute> } />
        <Route path="/dashboard/create-user" element={ <ProtectedRoute> <RegisterPage /> </ProtectedRoute> } />   
        <Route path="/profile" element={  <ProfilePage /> } />
        <Route path="/dashboard/user-details/:userId" element={ <ProtectedRoute> <UserDetailsPage /> </ProtectedRoute> } />
        <Route path="/dashboard/edit-profile/:userId" element={ <ProtectedRoute> <EditProfilePage /> </ProtectedRoute> } />
      </Routes>
 
  );
}

