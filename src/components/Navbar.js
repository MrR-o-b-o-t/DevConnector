import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// styles & images
import "./Navbar.css";
// import logo from "../assets/logo.svg";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          {/* <img src={logo} alt="logo" /> */}
          <span>Dev Connector</span>
        </li>

        {!user && (
          <>
            <li>
              <Link className="btn" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="btn" to="/signup">
                Signup
              </Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
