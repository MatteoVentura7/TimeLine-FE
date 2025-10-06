import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function ProtectedRoute({ children, requireToken }) {
  const location = useLocation();
  if (requireToken) {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (!token) {
      return <Navigate to="/" replace />;
    }
  } else {
    const token = localStorage.getItem('token');

    if (!token) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;