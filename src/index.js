import firebase from "firebase/app";
import "firebase/firestore";

import dropDownDOM from "./dropdown";

import "./style.css";
import waldoOne from "./img/2Qq40y.jpg";

const firebaseConfig = {
  apiKey: "AIzaSyBdYrtf74T4_m7lba6UXzK7nOMeKc8IxFw",
  authDomain: "whereswaldo-90f94.firebaseapp.com",
  projectId: "whereswaldo-90f94",
  storageBucket: "whereswaldo-90f94.appspot.com",
  messagingSenderId: "713911585372",
  appId: "1:713911585372:web:9e8d2121ccbcff58433499",
  measurementId: "G-ZG8C0W97PG",
};
firebase.initializeApp(firebaseConfig);

const loadWaldo = () => {
  const waldoImg = document.createElement("img");
  waldoImg.src = waldoOne;
  const [app] = document.getElementsByClassName("app");
  app.appendChild(waldoImg);
  const characters = [{
      name: "Waldo",
  }];
  dropDownDOM(waldoImg, characters);
};
loadWaldo();