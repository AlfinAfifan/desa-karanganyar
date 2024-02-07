import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const authCheck = () => {
    // CEK EXPIRE
    const currentTime = new Date().getTime();
    const loginTime = sessionStorage.getItem('login_time');
    const expire = parseInt(loginTime, 10) + 24 * 60 * 60 * 1000;

    if (currentTime > expire) {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('login_time');
    }

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

  if (authCheck()) {
    return children;
  } else {
    window.location.href = '/';
  }
};

export default PrivateRoute;
