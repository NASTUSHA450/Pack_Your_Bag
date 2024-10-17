const objectsContainer = document.getElementById("objectsContainer");
const scoreWrapper = document.querySelector(".score-wrapper");
const scoreCounter = document.getElementById("scoreCounter");
const speachBubble = document.querySelector(".speach-bubble");
const backpack = document.querySelector(".backpack");
const winnerMessage = document.querySelector(".ready");
const restart = document.getElementById("restart");

const objects = [
  { id: "0", name: "nintendo" },
  { id: "1", name: "pencil" },
  { id: "2", name: "usb" },
  { id: "3", name: "notebook" },
  { id: "4", name: "pen" },
];
let score = 0;
window.addEventListener(
  "load",
  function () {
    startGame();
  },
  { once: true }
);

function startGame() {
  // remove game-completed classes
  backpack.classList.remove("done");
  backpack.classList.remove("center");
  backpack.classList.add("show");
  let score = 0;

  //map items
  objects.map((object, id) => {
    let el = document.createElement("div");
    el.classList.add("object", "object-appear", object.name);
    el.innerHTML = `<img src="./img/${object.name}.png" alt="${object.name}">`;

    //add onclick to items
    el.addEventListener(
      "click",
      () => {
        el.classList.add("chosen");
        score++;
        scoreCounter.textContent = `${score}`;
        if (score == 5) {
          gameCompleted();
          return;
        }
      },
      { once: true }
    );
    //display items with delay
    setTimeout(() => {
      objectsContainer.appendChild(el);
    }, (id + 1) * 150);
  });
  //add start-game classes
  winnerMessage.classList.add("hide");
  restart.classList.add("hide");
  restart.classList.remove("pointer");
  scoreCounter.textContent = "0";
  scoreWrapper.classList.remove("hide");
  scoreWrapper.classList.add("score-appear");
  speachBubble.classList.add("speach-bubble-appear");
  speachBubble.classList.remove("hide");
}

function gameCompleted() {
  // get all items
  const items = Array.from(document.querySelectorAll(".object"));
  //remove start-game classes
  items.map((item) => {
    item.classList.remove("object-appear");
    item.classList.add("fade-out");
    item.classList.add("chosen");
  });
  speachBubble.classList.remove("speach-bubble-appear");
  scoreWrapper.classList.remove("score-appear");
  fadeOut(speachBubble);
  fadeOut(scoreWrapper);
  backpack.classList.toggle("show");
  backpack.classList.toggle("center");
  setTimeout(function () {
    backpack.classList.add("done");
    objectsContainer.replaceChildren();
  }, 999);

  winnerMessage.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 1000,
  });
  winnerMessage.classList.remove("hide");
  restart.animate(
    [{ opacity: 0, transform: "translateY(50px)" }, { opacity: 1 }],
    {
      duration: 1000,
    }
  );
  restart.classList.remove("hide");
  restart.classList.add("pointer");
  restart.addEventListener(
    "click",
    () => {
      startGame();
    },
    { once: true }
  );
}

function fadeOut(el) {
  el.classList.add("hide");
  el.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1000,
  });
}
