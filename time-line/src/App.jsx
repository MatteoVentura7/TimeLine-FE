import Layout from "./layout/layout";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ConfirmEmailPage from "./pages/ConfirmEmailPage.jsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-user" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route path="/reset-password" element={
            <ChangePasswordPage /> 
        } />
      </Routes>
    </Layout>
  );
}

