import React, { useState } from 'react';
import ForgetPassword from './ForgetPassword';
import './LoginForm.css'

const LoginForm = ({ onLogin, loginButt }) => {
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
        <button type="submit" className="btn btn-primary" disabled={loginButt}>
          {loginButt ? <span className='spinner'></span> : "Login To Dashboard"}
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
