import "./loginpage.css";

import firebase from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc} from 'firebase/firestore';
import { storeUserDetails,getUserDetails,checkIfUserExists } from "../data/userdatamanagement";
import { useDispatch } from "react-redux";
import React, { useState } from 'react';


import {isExist,isNotExist} from '../data/userdata'

export const handleNew = async () => {

}

const { auth, db } = firebase;

async function signInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
   
    storeUserDetails(userCredential);
    const user = userCredential.user;
    console.log('User signed in successfully:', user);
    // You can access the user's information using the user object
    // For example, to get the user's email: user.email
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    // Handle errors here, such as wrong password, user not found, etc.
  }
}


async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User registered successfully:", user.uid);

    return user;
  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      alert("mail already exists");

    }
    else
      console.error("Error registering user:", error.message);
  }
}

async function createUserDocument(userId, name, email) {
  try {
    const userRef = doc(db, "users", userId);
    const payload = {
      name: name,
      email: email,
    }
    await setDoc(userRef, payload)

    console.log("User document created successfully:", userRef.id);
  } catch (error) {
    console.error("Error creating user document:", error.message);
  }
}



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const toggleForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };
  const submitLogin = () => {
    document.querySelector('.login-form').addEventListener('submit', function (event) {
      event.preventDefault();
      
    });
  }


  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    const user = await registerUser(email, password);
   
    if (user) {
      createUserDocument(user.uid, name, email);
      toggleForm();
    }

  };

  const handleSubmitlogin = async (e) => {
    
    
    const user = await signInUser(email, password);
    console.log(user.uid);
  
    const userdetails = getUserDetails(user.uid);
    const exists = await checkIfUserExists();
    console.log('Check result:', exists); 
    // Debugging log

    if (exists === true) { // Explicitly checking for boolean true
      console.log("User exists, dispatching action.");
      dispatch(isExist());
    } else {
      console.log("User does not exist.");
      dispatch(isNotExist());
      // Handle the case where the user does not exist
    }
    console.log("user details: " +userdetails );
  }
  return (
    <div className="login-container">
      {!showRegistrationForm && (<><form onSubmit={handleSubmitlogin} method="post" className="login-form">
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
        <button type="submit" onClick={submitLogin}>Login</button>
      </form>
        <button className="register-button" onClick={toggleForm}>Register</button></>)}
      {showRegistrationForm && (
        <form onSubmit={handleSubmitRegistration} method="post" className="registration-form">
          <h2>Register</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} required></input>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
          <button type="submit" >Register</button>
        </form>
      )}
    </div>
  )
}






// Optionally, add a way to close the registration form and return to the login form



export default LoginPage;