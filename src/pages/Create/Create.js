import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { timestamp } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router";
import Select from "react-select";
import {
  MDBInput,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

// styles
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a project category.");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user");
      return;
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const project = {
      name,
      details,
      assignedUsersList,
      createdBy,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
    };

    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  };

  return (
    <MDBContainer fluid className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <MDBRow className="mt-4">
          <label>
            <span>Project name:</span>
            <MDBInput
              label="Project Name"
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
        </MDBRow>
        <MDBRow className="mt-4">
          <label>
            <span>Project Details:</span>
            <MDBInput
              id="project-details-text"
              label="Project Details"
              wrapperClass="mb-4"
              textarea="true"
              required
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            ></MDBInput>
          </label>
        </MDBRow>
        <MDBRow className="mt-4">
          <label>
            <span>Set due date:</span>
            <MDBInput
              required
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </label>
        </MDBRow>
        <MDBRow className="mt-4">
          <label>
            <span>Project category:</span>
            <Select
              onChange={(option) => setCategory(option)}
              options={categories}
            />
          </label>
        </MDBRow>
        <MDBRow className="mt-4">
          <label>
            <span>Assign to:</span>
            <Select
              onChange={(option) => setAssignedUsers(option)}
              options={users}
              isMulti
            />
          </label>
        </MDBRow>

        <MDBRow className="mt-4">
          <MDBCol>
            <MDBBtn className="btn">Add Project</MDBBtn>
          </MDBCol>
        </MDBRow>

        {formError && <p className="error">{formError}</p>}
      </form>
    </MDBContainer>
  );
}
