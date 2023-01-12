import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
// import Sidebar from "../../components/Sidebar";
import OnlineUsers from "../../components/OnlineUsers";

// Bootstrap Components
import Alert from "react-bootstrap/Alert";

// MUI Components
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

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
    <MDBContainer fluid>
      <MDBRow>
        {/* <Col sm={2}>{user && <Sidebar />}</Col> */}
        <MDBCol sm={10} className="text-center">
          <h2 className="page-title">Dashboard</h2>
          {error && (
            <Alert variant="danger" className="error">
              {error}
            </Alert>
          )}
          {documents && <ProjectFilter changeFilter={changeFilter} />}
          {projects && <ProjectList projects={projects} />}
        </MDBCol>
        <MDBCol sm={2}> {user && <OnlineUsers />}</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
