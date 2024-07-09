import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import { useEffect } from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import {Dot} from './dot'
import {handleNew, handleEdit} from './util'


const { db } = firebase;
function App() {

  const [colors, setColors] = useState([]);
  console.log(colors);
  useEffect(() =>
    onSnapshot(collection(db, "colors"), (snapshot) => {
      setColors(snapshot.docs.map((doc) => ({...doc.data(),id:doc.id})));
    })
    , [])

    
  return (
    <div className="App">
    <button className='button' onClick={handleNew}>New</button>
      <ul>
        {colors.map(
          (color) => (
            <li key ={color.id}>
              <a href="#" onClick={()=>{handleEdit(color.id)}}>edit</a><Dot color={color.value} /> {color.color}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
