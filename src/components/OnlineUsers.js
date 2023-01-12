import { useCollection } from "../hooks/useCollection";

// MUI Components
import {
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

// components
import Avatar from "./Avatar";

// styles
import "./OnlineUsers.css";

export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection("users");

  return (
    <MDBContainer className="user-list">
      <h2>Team Members</h2>
      {isPending && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      {documents &&
        documents.map((user) => (
          <MDBRow>
            <MDBCol xs={12} key={user.id} className="user-list-item">
              {user.online && <span className="online-user"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </MDBCol>
          </MDBRow>
        ))}
    </MDBContainer>
  );
}
