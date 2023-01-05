import { AuthContext } from "AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContextData } from "types/AuthContextData";
import { getTokenData, isAuthenticated } from "util/auth";
import history from "util/history";
import { removeLoginAuthData } from "util/storage";

import './styles.css';

const Navbar = () => {

    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated()) {
            setAuthContextData({
                authenticated: true,
                tokenData: getTokenData(),
            })
        } else{
            setAuthContextData({
                authenticated: false,
            })
        }
    }, [setAuthContextData]);

    const handleLogout = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        removeLoginAuthData();
        setAuthContextData({
            authenticated: false,
        });

        history.replace('/');
    }

    return (
        <nav className="navbar navbar-expand-md bg-warning navbar-dark main-nav">
            <div className="container-fluid">
                <div>
                    <Link to="/movies" className="nav-logo">
                        <h6>MovieFlix</h6>
                    </Link>
                </div>
                <div>
                    {authContextData.authenticated ? (
                            <div className="logout-btn-container">
                                <button className="btn" onClick={handleLogout}>
                                    <h4>Sair</h4>
                                </button>
                            </div>
                        ) : ""
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;