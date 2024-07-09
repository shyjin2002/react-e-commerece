
import './App.css';
import db from "./firebase";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';


export const handleNew = async ()=> {
    const collectionRef = collection(db,"colors");
    const payload = {color:"black",value:"#001"};
          await addDoc(collectionRef,payload);
   }

   export const handleEdit = async (id)=> {
    const docRef = doc(db,"colors",id);
    const payload = {color:"pink",value:"#011"};
          await setDoc(docRef,payload);
   }
