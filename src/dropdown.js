const addDropDown = (coordinates, characters) => {
    const dropDown = document.createElement("div");
    const [app] = document.getElementsByClassName("app");
    const [oldDropDown] = document.getElementsByClassName("drop-down");
    if (oldDropDown) oldDropDown.remove();
    const [x,y] = coordinates;
    dropDown.style.top = `${y}px`;
    dropDown.style.left = `${x+25}px`;
    dropDown.className = "drop-down";
    dropDown.style.position = "absolute";
    app.appendChild(dropDown);
    characters.forEach(character => {
        const charDiv = document.createElement("div");
        charDiv.textContent = character.name;
        dropDown.appendChild(charDiv);
    })
}

const dropDownDOM = (element, characters) => {
    element.addEventListener("click", (e) => {
        const coordinates = [e.clientX, e.clientY];
        addDropDown(coordinates, characters);
    })
}

export default dropDownDOM;