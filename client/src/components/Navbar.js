import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header className="bg-secondary mb-4 py-2 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
            <Link to="/">
                <h1 className='title'>Movie Lot</h1>
            </Link>
            
            <nav className="text-center">
            {Auth.loggedIn() ? (
                <>
                <a href="/" onClick={logout} className='logout-link'>
                Logout
                </a>
                <a href="/savedmovies" onClick={Link} className='saved-link'>
                Your Lot
                </a>
                </>
                ) : (
                    <>
                    <div>
                    <Link to="/login" className='login-link'>Login</Link>
                    </div>
                    <div>
                    <Link to="/signup" className='signup-link'>Signup</Link>
                    </div>
                    </>
                    )}
                    </nav>
                    </div>
                    </header>
                    );
                }

export default Navbar; 