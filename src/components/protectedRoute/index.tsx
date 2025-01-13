import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/auth';

interface IProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: IProtectedRouteProps) {
  return isTokenValid() ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
