import React, { useState } from 'react';
import ForgetPassword from './ForgetPassword';

const LoginForm = ({ onLogin }) => {
    const [showForgotPassword, setShowForgotPassword ] = useState(false)
  return (
    
    <div className="login-wrapper">
        {showForgotPassword ? (
            <ForgetPassword onClose={() => setShowForgotPassword(false)} />
        ) : (

        <form onSubmit={onLogin} className="login-form">
        <h2 className="login-title">Admin Login</h2>
        <div className="form-group">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login to Dashboard
        </button>
        <button className="btn btn-primary" onClick={()=>setShowForgotPassword(true)}>
            Reset password
        </button>
      </form>
        )}
      
    </div>
  );
};

export default LoginForm;
