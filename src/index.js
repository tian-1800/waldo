import db from "./firebase";

import dropDownDOM from "./dropdown";

import "./style.css";
import waldoOne from "./img/2Qq40y.jpg";



const markChar = (coordinates) => {
  const [app] = document.getElementsByClassName("app");
  const frameMarker = document.createElement("div");
  frameMarker.className = "frame-marker";
  const [left, top] = coordinates;
  frameMarker.style.top = `${top}px`;
  frameMarker.style.left = `${left}px`;
  app.appendChild(frameMarker);
  const [oldDropDown] = document.getElementsByClassName("drop-down");
  if (oldDropDown) oldDropDown.remove();
};

const checkChar = async (char, coordinates) => {
  const [x, y] = coordinates;
  const querySnapshot = await db.collection("image").get();
  const doc = querySnapshot.docs[0];
  console.log('char ', doc.data() );
  const [x0, y0] = doc.data()[char];
  console.log(x, y, x0, y0);
  if (Math.abs(x - x0) < 15 && Math.abs(y - y0) < 25) {
    markChar([x0-20, y0-30]);
    return true;
  }
  return false;
};

const loadWaldo = () => {
  const waldoImg = document.createElement("img");
  waldoImg.className = "waldo-img";
  waldoImg.src = waldoOne;
  const [app] = document.getElementsByClassName("app");
  app.appendChild(waldoImg);
  const characters = [
    {
      name: "waldo",
    },
  ];
  dropDownDOM(waldoImg, characters, checkChar);
};
loadWaldo();
