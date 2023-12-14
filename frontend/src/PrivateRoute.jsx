import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginPage from './pages/loginPage';
import { useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const authCheck = () => {
    const accessToken = sessionStorage.getItem('access_token');
    const allowedUserIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    if (accessToken) {
      try {
        const userData = jwtDecode(accessToken);
        if (allowedUserIDs.includes(userData.userid)) {
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return false;
  };

  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      if (!authCheck()) {
        navigate('/login');
      } else if (location.pathname === '/' || location.pathname === '/login') {
        navigate('/dashboard');
      }
    };

    checkAuthentication();
  }, [authCheck, navigate]);

  return authCheck() ? children : <LoginPage />;
};

export default PrivateRoute;
