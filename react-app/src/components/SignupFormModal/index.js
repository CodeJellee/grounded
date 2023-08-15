import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { setModalContent } = useModal()

	const sessionUser = useSelector((state) => state.session.user);
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { closeModal } = useModal();
	const [errors, setErrors] = useState([]);
	const [submitted, setSubmitted] = useState(false);

	if (sessionUser) return <Redirect to="/" />;

	const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);


    const errorsObject = {};

    // First Name
    if (first_name === "") {
		errorsObject.first_name = "First name is required.";
    } else if (first_name.length < 3) {
		errorsObject.first_name = "Min. 3 characters required.";
    }

    // Last Name
    if (last_name === "") {
		errorsObject.last_name = "Last name is required.";
    } else if (last_name.length < 3) {
		errorsObject.last_name = "Min. 3 characters required.";
    }

    // Email
    if (email === "") {
		errorsObject.email = "Email is required.";
    } else if (email && !(email.endsWith("@aa.io"))) {
		errorsObject.email = "Valid email ending in @aa.io required.";
    }

    // Username
    if (username === "") {
		errorsObject.username = "Username is required.";
    } else if (username.length < 5) {
		errorsObject.username = "Min. 5 characters required.";
    }

    // Password
    if (password === "") {
		errorsObject.password = "Password is required.";
    } else if (password.length < 5) {
		errorsObject.password = "Min. 5 characters required.";
    }

    // Confirm Password
    if (confirmPassword === "") {
		errorsObject.confirmPassword = "Confirm Password is required.";
    } if (password !== confirmPassword) {
		errorsObject.confirmPassword = "Passwords must match.";
    }


    if (Object.values(errorsObject).length > 0) return setErrors(errorsObject);

	// let fetchResponseFromThunk = await dispatch(signUp(first_name, last_name, username, email, password));

	// if (fetchResponseFromThunk){
	// 	closeModal()
	// 	return <Redirect to="/" />
	// }

	try {
		const fetchResponseFromThunk = await dispatch(
		  signUp(first_name, last_name, username, email, password)
		);

		if (fetchResponseFromThunk) {
		  // Handle error response from signUp action
		  setErrors(fetchResponseFromThunk);
		} else {
		  closeModal();
		  history.push("/");
		}
	  } catch (error) {
		console.error("Error:", error);
	  }

  };

  return (
    <>
      <h3 className="login-model-title">Create Account</h3>
      <form onSubmit={onSubmit}>
		<div className="signup-modal-info">
			<div className="sign-up-form-data">
				<label className="sign-up-info">
				<div>{submitted && errors.first_name && <div className="errors">{errors.first_name}</div>}</div>
				<input
					className="new-login-info"
					type="text"
					placeholder="First Name"
					value={first_name}
					onChange={(e) => setFirst_name(e.target.value)}
					required
				/>
				</label>
				<label className="sign-up-info">
				<div>{submitted && errors.last_name && <div className="errors">{errors.last_name}</div>}</div>
				<input
					className="new-login-info"
					type="text"
					placeholder="Last Name"
					value={last_name}
					onChange={(e) => setLast_name(e.target.value)}
					required
				/>
				</label>
			</div>
			<div className="sign-up-form-data">
				<label className="sign-up-info">
				<div>{submitted && errors.email && <div className="errors">{errors.email}</div>}</div>
				<input
					className="new-login-info"
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				</label>
				<label className="sign-up-info">
				<div>{submitted && errors.username && <div className="errors">{errors.username}</div>}</div>
				<input
					className="new-login-info"
					type="text"
					value={username}
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				</label>
			</div>
			<div className="sign-up-form-data">
				<label className="sign-up-info">
				<div>{submitted && errors.password && <div className="errors">{errors.password}</div>}</div>
				<input
					className="new-login-info"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				</label>
				<label className="sign-up-info">
				<div>{submitted && errors.confirmPassword && <div className="errors">{errors.confirmPassword}</div>}</div>
				<input
					className="new-login-info"
					type="password"
					placeholder="Re-type Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				</label>
			</div>
			<div className="login-model-button-container">
				<button className="login-model-button" type="submit">Create account</button>
			</div>
		</div>
      </form>
	  <div className="login-model-sign-up-container">
        <div className="need-account">Have an account?</div>
        <div>
          <a className="signup-bottom-button" onClick={(() => setModalContent(<LoginFormModal />))}>Login</a>
        </div>
      </div>

    </>
  );
}

export default SignupFormModal;

//added first_name and last_name but with ORIGINAL ERROR VALIDATIONS
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { signUp } from "../../store/session";
// import "./SignupForm.css";

// function SignupFormModal() {
// 	const dispatch = useDispatch();
// 	const [first_name, setFirst_name] = useState("");
// 	const [last_name, setLast_name] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [confirmPassword, setConfirmPassword] = useState("");
// 	const [errors, setErrors] = useState([]);
// 	const { closeModal } = useModal();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (password === confirmPassword) {
// 			const data = await dispatch(signUp(first_name, last_name, username, email, password));
// 			if (data) {
// 				setErrors(data);
// 			} else {
// 				closeModal();
// 			}
// 		} else {
// 			setErrors([
// 				"Confirm Password field must be the same as the Password field",
// 			]);
// 		}
// 	};

// 	return (
// 		<>
// 			<h1>Sign Up</h1>
// 			<form onSubmit={handleSubmit}>
// 				<ul>
// 					{errors.map((error, idx) => (
// 						<li key={idx}>{error}</li>
// 					))}
// 				</ul>
// 				<label>
// 					First Name
// 					<input
// 						type="text"
// 						value={first_name}
// 						onChange={(e) => setFirst_name(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Last Name
// 					<input
// 						type="text"
// 						value={last_name}
// 						onChange={(e) => setLast_name(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Email
// 					<input
// 						type="text"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Username
// 					<input
// 						type="text"
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Password
// 					<input
// 						type="password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Confirm Password
// 					<input
// 						type="password"
// 						value={confirmPassword}
// 						onChange={(e) => setConfirmPassword(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<button type="submit">Sign Up</button>
// 			</form>
// 		</>
// 	);
// }

// export default SignupFormModal;

//ORIGINAL BELOW
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { signUp } from "../../store/session";
// import "./SignupForm.css";

// function SignupFormModal() {
// 	const dispatch = useDispatch();
// 	const [email, setEmail] = useState("");
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [confirmPassword, setConfirmPassword] = useState("");
// 	const [errors, setErrors] = useState([]);
// 	const { closeModal } = useModal();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (password === confirmPassword) {
// 			const data = await dispatch(signUp(username, email, password));
// 			if (data) {
// 				setErrors(data);
// 			} else {
// 				closeModal();
// 			}
// 		} else {
// 			setErrors([
// 				"Confirm Password field must be the same as the Password field",
// 			]);
// 		}
// 	};

// 	return (
// 		<>
// 			<h1>Sign Up</h1>
// 			<form onSubmit={handleSubmit}>
// 				<ul>
// 					{errors.map((error, idx) => (
// 						<li key={idx}>{error}</li>
// 					))}
// 				</ul>
// 				<label>
// 					Email
// 					<input
// 						type="text"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Username
// 					<input
// 						type="text"
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Password
// 					<input
// 						type="password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Confirm Password
// 					<input
// 						type="password"
// 						value={confirmPassword}
// 						onChange={(e) => setConfirmPassword(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<button type="submit">Sign Up</button>
// 			</form>
// 		</>
// 	);
// }

// export default SignupFormModal;
