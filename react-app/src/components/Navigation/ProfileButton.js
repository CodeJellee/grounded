// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const handleLogout = (e) => {
//     e.preventDefault();
//     dispatch(logout());
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
//   const closeMenu = () => setShowMenu(false);

//   return (
//     <>
//       <a href="" onClick={openMenu}>
//         {/* <i className="fas fa-user-circle" /> */}
//         Login
//       </a>
//       <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//           <>
//             <li>{user.username}</li>
//             <li>{user.email}</li>
//             <li>
//               <button onClick={handleLogout}>Log Out</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <OpenModalButton
//               buttonText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />

//             <OpenModalButton
//               buttonText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;


import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal"
// import SignupFormModal from "../SignupFormModal"

// import ProfileModal from "../ProfileModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal()

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      {user ? (
        <>
          <a onClick={handleLogout}>Logout</a>
          {/* <ProfileModal user={user} /> */}
        </>
      ) : (
        <>
          <a onClick={(() => setModalContent(<LoginFormModal />))}>Login</a>
          {/* <a onClick={(() => setModalContent(<SignupFormModal />))}>Sign Up</a> */}
        </>
      )}
    </>
  );
}

export default ProfileButton;
