import highscore from "./highscore";

import "./dropdown.css";
import icon from "./img/waldo-icon.jpg";


const charDivDOM = (div, callback, character, coordinates) => {
    const t0 = performance.now();
    div.addEventListener("click", async () => {
        const state = await callback(character.name, coordinates);
        if (state) {
            console.log(state);
            const t1 = performance.now();
            highscore(t1-t0);
        }   else console.log(state);
    })
}

const addDropDown = (coordinates, characters, checkChar) => {
    const dropDown = document.createElement("div");
    const [app] = document.getElementsByClassName("app");
    const [oldDropDown] = document.getElementsByClassName("drop-down");
    if (oldDropDown) oldDropDown.remove();
    const [x,y] = coordinates;
    dropDown.style.top = `${y}px`;
    dropDown.style.left = `${x+25}px`;
    dropDown.className = "drop-down";
    app.appendChild(dropDown);
    characters.forEach(character => {
        const charDiv = document.createElement("div");
        charDivDOM(charDiv, checkChar, character, coordinates)
        const iconImg = document.createElement("img");
        const text = document.createElement("p");
        text.textContent = character.name;
        iconImg.src = icon;
        charDiv.className = "character";
        charDiv.appendChild(iconImg);
        charDiv.appendChild(text);
        dropDown.appendChild(charDiv);
    })
}

const dropDownDOM = (element, characters, checkChar) => {
    element.addEventListener("click", (e) => {
        const coordinates = [e.pageX, e.pageY];
        addDropDown(coordinates, characters, checkChar);
        // console.log(coordinates);
        // waldo one is 1170, 200
    })
}

export default dropDownDOM;