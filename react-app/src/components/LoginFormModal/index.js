import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const { setModalContent } = useModal()
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push("/");
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push("/");
    }
  };

  return (
    <div id="login-modal-background-test">
      <h3 className="login-model-title">Welcome to grounded.</h3>
      <form onSubmit={handleSubmit}>
        <div className="errors-div">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div className="login-modal-info">
          <label className="login-info-label">
            <input
              className="login-info"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="login-info-label">
            <input
              className="login-info"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="login-model-button-container">
            <button className="login-model-button" type="submit">Sign in</button>
          </div>
        </div>
      </form>
      <div className="login-model-sign-up-container">
        <div className="need-account">Need an account?</div>
        <div>
          <a className="signup-bottom-button" onClick={(() => setModalContent(<SignupFormModal />))}>Create account</a>
        </div>
      </div>
      <div className="login-model-sign-up-container">
        <div>
          <a className="signup-bottom-button" onClick={handleDemoSubmit}>Demo User</a>
        </div>
      </div>
    </div>
  );
}

export default LoginFormModal;
