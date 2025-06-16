import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyCbcvXOh1GYwkSKJx3g_7scTgtM3eqyW6k",
        authDomain: "login-form-a3a03.firebaseapp.com",
        projectId: "login-form-a3a03",
        storageBucket: "login-form-a3a03.firebasestorage.app",
        messagingSenderId: "705138616101",
        appId: "1:705138616101:web:e5f099a26e44ba0a365ccc"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = user.uid;
        console.log('Current user:', user);
        
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
            } else {
                console.log("No document found matching id");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
    } else {
        // If no user is logged in, redirect to login page
        window.location.href = 'index.html';
    }
  });

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })