// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js"

import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, getDoc,updateDoc, setDoc,arrayUnion,arrayRemove} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyDYOvPYlfQvXi3i3ACsBE5iRJH0LxoMBqI",

  authDomain: "psicologico-fd2fc.firebaseapp.com",

  projectId: "psicologico-fd2fc",

  storageBucket: "psicologico-fd2fc.appspot.com",

  messagingSenderId: "247106661610",

  appId: "1:247106661610:web:c173618eefe6c6684f7b93",

  measurementId: "G-FLXC106BZD"

};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth();

const db = getFirestore();

export{
    app,
    analytics,
    auth,
    db,
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove
    
  }