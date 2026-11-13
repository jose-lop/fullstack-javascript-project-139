import useAuthStore from '../store/authStore.js';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;