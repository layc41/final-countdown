import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
            <div className="flex-row justify-space-between">
            <Link to="/">
                <h1>Movie Lot</h1>
            </Link>
            
            <nav className="d-flex justify-content-end">
            {Auth.loggedIn() ? (
                <>
                <a href="/" onClick={logout}>
                Logout
                </a>
                </>
                ) : (
                    <>
                    <div className="login-logout">
                    <Link to="/login">Login</Link>
                    </div>
                    <div className="login-logout">
                    <Link to="/signup">Signup</Link>
                    </div>
                    </>
                    )}
                    </nav>
                    </div>
                    </header>
                    );
                }

export default Navbar; 