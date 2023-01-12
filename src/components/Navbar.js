import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// // Bootstrap Components
import Nav from "react-bootstrap/Nav";

// // MUI Components
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";

// styles & images
import "./Navbar.css";
import Logo from "../assets/dc_logo.svg";

export default function MainNavbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  const [showNav, setShowNav] = useState(false);

  return (
    // <nav className="navbar">
    //   <ul>
    //     <li className="logo">
    //       <img src={Logo} alt="dojo logo" />
    //       <span>Dev Connector</span>
    //     </li>

    //     {!user && (
    //       <>
    //         <li>
    //           <Link to="/login">Login</Link>
    //         </li>
    //         <li>
    //           <Link to="/signup">Signup</Link>
    //         </li>
    //       </>
    //     )}

    //     {user && (
    //       <li>
    //         {!isPending && (
    //           <button className="btn" onClick={logout}>
    //             Logout
    //           </button>
    //         )}
    //         {isPending && (
    //           <button className="btn" disabled>
    //             Logging out...
    //           </button>
    //         )}
    //       </li>
    //     )}
    //   </ul>
    // </nav>

    <MDBNavbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="dark"
      className="mb-5"
    >
      <MDBContainer fluid>
        <MDBNavbarBrand href="/" className="logo">
          <img src={Logo} alt="Dev Connector logo" />
          <span>Dev Connector</span>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav} className="justify-content-end mx-3">
          {!user && (
            <Nav>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Link className="btn" to="/login">
                    Login
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Link className="btn" to="/signup">
                    Signup
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </Nav>
          )}

          {user && (
            <>
              {!isPending && (
                <Nav>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link className="btn" onClick={logout}>
                        Logout
                      </Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link className="btn" exact to="/">
                        Dashboard
                      </Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link className="btn" to="/create">
                        New Project
                      </Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </Nav>
              )}
              {isPending && (
                <button className="btn" disabled>
                  Logging out...
                </button>
              )}
            </>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
