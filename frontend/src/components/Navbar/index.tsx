import { Link } from "react-router-dom";

import './styles.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md bg-warning navbar-dark main-nav">
            <div className="container-fluid">
                <Link to="/" className="nav-logo">
                    <h4>MovieFlix</h4>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;