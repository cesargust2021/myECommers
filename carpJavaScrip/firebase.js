// Import the functions you need from the SDKs you need


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import {getFirestore, collection, getDocs, doc, getDoc} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"


const firebaseConfig = {
  apiKey: "AIzaSyDg9Kepu67uzJlBUYBuPntk0oPiz1l6nUs",
  authDomain: "my-e-comers.firebaseapp.com",
  projectId: "my-e-comers",
  storageBucket: "my-e-comers.appspot.com",
  messagingSenderId: "584114081",
  appId: "1:584114081:web:78fa77f7b4374c59e8f5e0"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// import { collection, getDocs } from "firebase/firestore";

export const getService = async() => {

    const querySnapshot = await getDocs(collection(db, "products"));
    
    const products = [];

    querySnapshot.forEach((doc) => {
      
      products.push(doc);

      // console.log(doc.data());
      // console.log(`${doc.id} => ${doc.data()}`);
    
    });

    return products;

}

// import { doc, getDoc } from "firebase/firestore";

export const carryToCart = async(id) => {

  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

}
