// import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// styles & images
import "./Navbar.css";
import Logo from "../assets/dc_logo.svg";

export default function MainNavbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

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

    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="mb-5"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="logo">
          <img src={Logo} alt="Dev Connector logo" />
          <span>Dev Connector</span>
        </Navbar.Brand>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end mx-3"
        >
          {!user && (
            <Nav>
              <>
                <li>
                  <Nav.Link to="/login">Login</Nav.Link>
                </li>
                <li>
                  <Nav.Link to="/signup">Signup</Nav.Link>
                </li>
              </>
            </Nav>
          )}

          {user && (
            <Nav>
              {!isPending && (
                <Nav.Link className="btn" onClick={logout}>
                  Logout
                </Nav.Link>
              )}
              {isPending && (
                <button className="btn" disabled>
                  Logging out...
                </button>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
