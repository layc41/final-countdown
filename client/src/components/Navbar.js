import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {
    // const logout = event => {
    //     event.preventDefault();
    //     Auth.logout();
    // };

    return (
        <header className="bg-secondary mb-4 py-2 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <Link to="/">
                    <h1>MovieLot</h1>
                </Link>

                <nav className="text-center">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                        
                </nav>
            </div>
        </header>
    );
}

export default Navbar; 