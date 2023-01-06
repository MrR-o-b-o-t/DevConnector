import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Sidebar from "../../components/Sidebar";
import OnlineUsers from "../../components/OnlineUsers";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

// components
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";

// styles
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("projects");
  const [filter, setFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (filter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "development":
          case "design":
          case "sales":
          case "marketing":
            return document.category === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>{user && <Sidebar />}</Col>
        <Col sm={8} className="text-center">
          <h2 className="page-title">Dashboard</h2>
          {error && (
            <Alert variant="danger" className="error">
              {error}
            </Alert>
          )}
          {documents && <ProjectFilter changeFilter={changeFilter} />}
          {projects && <ProjectList projects={projects} />}
        </Col>
        <Col sm={2}> {user && <OnlineUsers />}</Col>
      </Row>
    </Container>
  );
}
