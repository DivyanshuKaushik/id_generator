import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand text-light">
                    ID Card Generator
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link active text-light">
                                Home
                            </NavLink>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle text-black btn btn-outline-light"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Vidya Bharti
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink
                                        to="/vidya-bharti/create"
                                        className="dropdown-item bg-white text-black"
                                    >
                                        New ID
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/vidya-bharti/view"
                                        className="dropdown-item bg-white text-black"
                                    >
                                        View all ID
                                    </NavLink>
                                </li>
                            </ul>
                        </li> */}
                        <li className="nav-item">
                            <NavLink
                                to="/vidya-bharti"
                                className="nav-link active text-light"
                            >
                                Vidya Bharti
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
