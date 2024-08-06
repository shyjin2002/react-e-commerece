import React, { useEffect, useState } from 'react';
import LoginPage from './ui/loginpage';
import HomePage from './ui/homepage'; // Import your home page component
import { checkIfUserExists} from './data/userdatamanagement';
import {isExist,isNotExist} from './data/userdata'
import { useSelector, useDispatch } from 'react-redux';



const App = () => {
 
  

 

 const user = useSelector((state) => state.userExist.value); // Assuming the initial state is 0
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
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
      } catch (error) {
        console.error("Error checking user existence:", error);
       
      }
      
     
     
    };
  
    checkUser();
  }, [checkIfUserExists, dispatch]); // Assuming isUserExist is not needed here
  return (
    <div>
      {user ? <HomePage /> : <LoginPage />}
    </div>
  );
};

export default App;