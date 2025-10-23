import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRouteAccess({ children, requireToken }) {
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

export default ProtectedRouteAccess;