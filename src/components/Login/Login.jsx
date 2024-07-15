import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Home from '../home/Home';

function Login() {
    const [emaillog, setEmaillog] = useState('');
    const [passwordlog, setPasswordlog] = useState('');
    const [flag, setFlag] = useState(false);
    const [home, setHome] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetPasswordEmail, setResetPasswordEmail] = useState('');
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

    function handleLogin(e) {
        e.preventDefault();

        const storedEmail = localStorage.getItem('SubmissionEmail');
        const storedPassword = localStorage.getItem('SubmissionPassword');

        if (!emaillog || !passwordlog) {
            setFlag(true);
        } else if (storedEmail === null || storedPassword === null) {
            setFlag(true);
        } else {
            const emailFromStorage = storedEmail.replace(/"/g, '');
            const passwordFromStorage = storedPassword.replace(/"/g, '');

            if (emaillog !== emailFromStorage || passwordlog !== passwordFromStorage) {
                setFlag(true);
            } else {
                setHome(false);
                setFlag(false);
            }
        }
    }

    function handleForgotPasswordClick() {
        setShowForgotPassword(true);
    }

    function handleResetPassword(e) {
        e.preventDefault();
       
        setPasswordResetSuccess(true);
        setResetPasswordEmail('');
        setTimeout(() => {
            setShowForgotPassword(false);
            setPasswordResetSuccess(false);
        }, 3000); 
    }
  

    return (
        <div>
            {home ? (
                <>
                    <form onSubmit={handleLogin}>
                        <h3>Login</h3>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(event) => setEmaillog(event.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => setPasswordlog(event.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>

                        {flag && (
                            <Alert variant="warning">
                                Incorrect email or password. Please try again.
                            </Alert>
                        )}

                        <button type="button" className="btn btn-link" onClick={handleForgotPasswordClick}>
                            Forgot Password?
                        </button>
                    </form>

                    {showForgotPassword && (
                        <form onSubmit={handleResetPassword}>
                            <div className="form-group mt-3">
                                <label>Enter your email to reset password:</label>
                                <input type="email" className="form-control" value={resetPasswordEmail} onChange={(event) => setResetPasswordEmail(event.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Reset Password
                            </button>
                        </form>
                    )}

                    {passwordResetSuccess && (
                        <Alert variant="success" className="mt-3">
                            A password reset link has been sent to {resetPasswordEmail}. Check your inbox!
                        </Alert>
                    )}
                </>
            ) : (
                <Home />
            )}
        </div>
    );
}

export default Login;
