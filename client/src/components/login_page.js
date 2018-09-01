import React from 'react';
import AuthForm from '../components/auth_form';
import "../App.css";

const LoginPage = () => {
  return(
    <div>
      <AuthForm type="login" />
    </div>
  );
}

export default LoginPage;