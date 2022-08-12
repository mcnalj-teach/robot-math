import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function NavBar() {
 return (
   <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="nav-link" to="/">
            Splash
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                   Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logged-in">
                   Logged In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/question-base/exponents">
                   Exponents
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/unit-circle">
                   Unit Circle
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/question-base/derivatives">
                   Derivatives
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/integrals">
                   Integrals
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
 );
}
