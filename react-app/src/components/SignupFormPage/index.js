// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
// import { signUp } from "../../store/session";
// import './SignupForm.css';

// function SignupFormPage() {
//   const dispatch = useDispatch();
//   const history = useHistory()

//   const sessionUser = useSelector((state) => state.session.user);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

//   const [errors, setErrors] = useState([]);
//   const [submitted, setSubmitted] = useState(false)

//   if (sessionUser) return <Redirect to="/" />;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitted(true);

//     const errorsObject = {};

//     // First Name
//     if (firstName === "") {
//       errorsObject.firstName = "First name is required.";
//     } else if (firstName.length < 5) {
//       errorsObject.firstName = "Min. 5 characters required.";
//     }

//     // Last Name
//     if (lastName === "") {
//       errorsObject.lastName = "Last name is required.";
//     } else if (lastName.length < 5) {
//       errorsObject.lastName = "Min. 5 characters required.";
//     }

//     // Email
//     if (email === "") {
//       errorsObject.email = "Email is required.";
//     } // Add more email validation if needed

//     // Username
//     if (username === "") {
//       errorsObject.username = "Username is required.";
//     } // Add more username validation if needed

//     // Password
//     if (password === "") {
//       errorsObject.password = "Password is required.";
//     } // Add more password validation if needed

//     // Confirm Password
//     if (confirmPassword === "") {
//       errorsObject.confirmPassword = "Confirm Password is required.";
//     } else if (password !== confirmPassword) {
//       errorsObject.confirmPassword = "Passwords must match.";
//     }

//     // Additional validations for each field can be added here

//     // If there are any errors, set them in the state and stop further processing
//     if (Object.values(errorsObject).length > 0) {
//       setErrors(errorsObject);
//       return;
//     }

//     // If no errors, proceed with sign up
//     const data = await dispatch(signUp(username, email, password));
//     if (data) {
//       setErrors(data);
//     }
//   };

//   return (
//     <>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//         </ul>
//         <label>
//           First Name
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Last Name
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Email
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Username
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Confirm Password
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }

// export default SignupFormPage;






import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
