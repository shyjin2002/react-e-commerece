import firebase from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { configureStore } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';




const { db } = firebase;

export function openUserDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("userBox", 1);
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore("users", { autoIncrement: true }); // Auto-incrementing keys for simplicity
    };
    request.onsuccess = function(event) {
      resolve(event.target.result);
    };
    request.onerror = function(event) {
      reject("Error opening database");
    };
  });
}

export async function storeUserDetails(userCredential) {
  const user = userCredential.user;

  try {
    const db = await openUserDatabase();
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");
    const userData = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName, // Assuming you want to store the display name
      // Add any other relevant fields you wish to store
    };
    const request = store.put(userData, user.uid ); // Using user.id as the key, fallback to 1 if id is undefined
    await transaction.complete;
    return request; // Wait for the transaction to complete
  } catch (error) {
    console.error('Error storing user details:', error);
  }
}
export async function getUserDetails(uid) {
  try {
    console.log("user id:"+uid);
    const docRef = doc(db, 'users', uid);
    const docsnap = await getDoc(docRef);
        if (docsnap.exists) {
      console.log("Document data:", docsnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
}

export async function checkIfUserExists() {
  try {
    const db = await openUserDatabase();
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');

    const countRequest = await store.count();
    console.log("Count Request initiated:", countRequest);

    var countResult = 0;

    await new Promise((resolve, reject) => {
      countRequest.onsuccess = function(event) {
        countResult = event.target.result;
        console.log("Count Result:", countResult);
        resolve(); // Resolve the promise once the result is obtained
      };

      countRequest.onerror = function(event) {
        console.error('Error counting users:', event.target.error);
        reject(event.target.error); // Reject the promise on error
      };
    });

   
console.log(countResult); //  0
    return countResult > 0; // false
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
}
