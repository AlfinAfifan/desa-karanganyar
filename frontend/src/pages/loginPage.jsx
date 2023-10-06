import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      LoginPage
      <Link to="/dashboard">
        <button className="btn btn-neutral">Neutral</button>
      </Link>
    </div>
  );
};

export default LoginPage;
