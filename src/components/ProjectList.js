import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";

// MUI Components
import { MDBCol, MDBContainer, MDBRow, MDBCard } from "mdb-react-ui-kit";

// styles
import "./ProjectList.css";

export default function ProjectList({ projects }) {
  console.log(projects);

  return (
    <MDBContainer className="project-list mb-5">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <MDBRow className="assigned-to">
            <MDBCol sm={12}>
              <MDBCard>
                <p>
                  <strong>Assigned to:</strong>
                </p>
                <ul>
                  {project.assignedUsersList.map((user) => (
                    <li key={user.photoURL}>
                      <Avatar src={user.photoURL} />
                    </li>
                  ))}
                </ul>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </Link>
      ))}
    </MDBContainer>
  );
}
