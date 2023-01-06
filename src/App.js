import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// styles
import "./App.css";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// pages & components
import Dashboard from "./pages/Dashboard/Dashboard";
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Project from "./pages/Project/Project";
import MainNavbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <Container fluid className="App">
      <MainNavbar />
      <Row>
        {authIsReady && (
          <BrowserRouter>
            {user && (
              <Col xs={4}>
                <Sidebar />
              </Col>
            )}
            <div className="container">
              <Switch>
                <Route exact path="/">
                  {!user && <Redirect to="/login" />}
                  {user && <Dashboard />}
                </Route>
                <Route path="/create">
                  {!user && <Redirect to="/login" />}
                  {user && <Create />}
                </Route>
                <Route path="/projects/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <Project />}
                </Route>
                <Route path="/login">
                  {user && <Redirect to="/" />}
                  {!user && <Login />}
                </Route>
                <Route path="/signup">
                  {user && user.displayName && <Redirect to="/" />}
                  {!user && <Signup />}
                </Route>
              </Switch>
            </div>
            {user && (
              <Col xs={4}>
                <OnlineUsers />
              </Col>
            )}
          </BrowserRouter>
        )}
      </Row>
    </Container>
  );
}

export default App;
