let characterArray = [];

function nuke(event) {
  const id = event.target.id.toString().split(`_`)[0];
  const target = document.getElementById(id);
  const newArray = characterArray.filter((character) => {
    return character.name.split(` `).join(``) !== target.id;
  });
  characterArray = newArray;
  target.remove();
  sortCharacters();
}

function sortCharacters() {
  const sorted = characterArray.sort(function (a, b) {
    return b.score - a.score;
  });
  sorted.forEach((character) => {
    console.log(`${character.name} got ${character.score}`);
  });
  const sortedCharacterArray = document.getElementById(
    "sorted-character-array"
  );
  var sortedCharacterArrayHTML = "";
  for (var i = 0; i < sorted.length; i++) {
    const id = sorted[i].name.split(` `).join(``);
    const hp = sorted[i].hp;
    const safeName = id.toString();
    sortedCharacterArrayHTML += `
    <div class="character-card-top" id=${id}_card>
      <div class="character-name">${sorted[i].name} - <span id="${id}_hp_text" class="hp-span">${hp}</span></div>
      <div class="character-card-panel">
        <button type="button" onclick="subtract(${safeName})">-</button>
        <input type="number" id="${id}_hp_input" name="${id}_hp_input" value="0" min="0" />
        <button type="button" onclick="add(${safeName})">+</button>
        </div>
    </div>
    `;
  }
  sortedCharacterArray.innerHTML = sortedCharacterArrayHTML;
}

// <div class="character-card-top" id=${id}_card>
//   <div class="character-name">${id} - ${hp}</div>
//   <div class="character-card-panel">
//     <button type="button" onclick="subtract(${id + "_card"})">-</button>
//     <input type="text" id="${id}_hp_text" name="${id}_hp_text" value="${hp}" />
//     <button type="button" onclick="add(${hp})">+</button>
//     </div>
// </div>

function addCharacter() {
  const name = document.getElementById("name").value;
  const hp = document.getElementById("hp").value;
  const score = document.getElementById("score").value;
  characterArray.push({ name, hp, score });
  const uniqueId = name.replace(/\s/g, "");
  var characterList = document.getElementById("character-list");
  var characterListHTML =
    "<div class='character-card' id=" +
    uniqueId +
    ">" +
    "<div class='character-list-item-name'>Name:" +
    name +
    "</div>" +
    "<div class='character-list-item-hp'> HP:" +
    hp +
    "</div>" +
    "<div class='character-list-item-initiative'> Initiative:" +
    score +
    "</div>" +
    "<button type='button' onclick='nuke(event)' id=" +
    uniqueId +
    "_button>DELETE</button>";
  characterList.innerHTML += characterListHTML;
}

function subtract(element) {
  const { id: name } = element;
  const hp = document.getElementById(name + "_hp_text").innerHTML;
  const subtract = document.getElementById(name + "_hp_input").value;
  document.getElementById(name + "_hp_text").innerHTML =
    parseInt(hp) - parseInt(subtract);
}

function add(element) {
  const { id: name } = element;
  const hp = document.getElementById(name + "_hp_text").innerHTML;
  const add = document.getElementById(name + "_hp_input").value;
  document.getElementById(name + "_hp_text").innerHTML =
    parseInt(hp) + parseInt(add);
}
