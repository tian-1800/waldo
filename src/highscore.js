import db from "./firebase";

import "./highscore.css";

const highscoreRef = db.collection("highscore").orderBy("time").limit(10);

const retrieveHighscore = async () => {
  const data = await highscoreRef.get();
  if (data.docs.length < 10) return false;
  const lowestData = data.docs[data.docs.length - 1].data();
  const lowestScore = lowestData.time;
  console.log(lowestScore);
  return lowestScore;
};

const displayHighscore = async () => {
  const data = await highscoreRef.get();
  const [app] = document.getElementsByClassName("app");
  const list = document.createElement('div');
  const title = document.createElement("p");
  title.textContent = "Top Scorer";
  list.className = 'highscore-list';
  list.appendChild(title);
  data.docs.forEach(doc => {
    const li = document.createElement("li");
    const content = `<span>${doc.data().name}</span><span>${doc.data().time/1000} s</span>`;
    li.innerHTML = content;
    li.className = "highscore-element";
    list.appendChild(li);
  })
  app.appendChild(list);
}

const addFormDOM = (form, database, t) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    database.collection("highscore").add({ name, time: t });
    form.remove();
    displayHighscore();
  });
};

const addScoreForm = (parentElement, t) => {
  const form = document.createElement("form");
  form.className = "score-form";
  const nameLabel = '<label for="name">Enter your name:</label>';
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.id = "name";
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Submit";
  addFormDOM(form, db, t);
  form.innerHTML = nameLabel;
  form.appendChild(nameInput);
  form.appendChild(button);
  parentElement.appendChild(form);
};

const highscore = async (t) => {
  const lowestScore = await retrieveHighscore(highscoreRef);
//   console.log("hehe ", t < lowestScore || !lowestScore);
  if (t < lowestScore || !lowestScore) {
    const [app] = document.getElementsByClassName("app");
    addScoreForm(app, t);
  }
};

export default highscore;
