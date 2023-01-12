import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// MUI Components
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

// styles
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>login</h2>
      <label>
        <span>email:</span>
        <MDBInput
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <MDBInput
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <MDBBtn className="mt-3">Log in</MDBBtn>}
      {isPending && (
        <MDBBtn className="mt-3" disabled>
          loading
        </MDBBtn>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
