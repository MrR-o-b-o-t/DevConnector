import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { MDBCol, MDBRow, MDBContainer } from "mdb-react-ui-kit";

// components
import ProjectComments from "./ProjectComments";
import ProjectSummary from "./ProjectSummary";

// styles
import "./Project.css";

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol size="8">
          <ProjectSummary project={document} />
        </MDBCol>
        <MDBCol size="4">
          <ProjectComments project={document} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
