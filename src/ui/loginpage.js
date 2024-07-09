import "./loginpage.css";
import { useState } from "react";
import firebase from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';


export const handleNew = async ()=> {
    
   }

const { auth, db } = firebase;


async function registerUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,email, password);
      const user = userCredential.user;
      console.log("User registered successfully:", user.uid);
      
      return user;
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  }

  async function createUserDocument(userId,name,email) {
    try {
      const userRef = doc(db,"users",userId);
      const payload = {name:name,
            email: email,}
      await setDoc(userRef,payload)


       
  
      console.log("User document created successfully:", userRef.id);
    } catch (error) {
      console.error("Error creating user document:", error.message);
    }
  }

  

function LoginPage() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    const toggleForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
    };
    const submitLogin = () => {
        document.querySelector('.login-form').addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Form submitted!');
        });
    }
    const  handleSubmit = async(e) => {
        e.preventDefault();
        console.log("handlesubmit");
        const user = await registerUser(email, password);
        if(user){
          createUserDocument(user.uid,name,email);
          toggleForm();
        }
        
      };
    return (
        <div className="login-container">
            {!showRegistrationForm && (<><form action="/submit-login" method="post" className="login-form">
                <h2>Login</h2>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required></input>
                <button type="submit" onClick={submitLogin}>Login</button>
            </form>
                <button className="register-button" onClick={toggleForm}>Register</button></>)}
            {showRegistrationForm && (
                <form onSubmit={handleSubmit} method="post" className="registration-form">
                <h2>Register</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" id="email" name="name" onChange={(e) => setName(e.target.value)} required></input>
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