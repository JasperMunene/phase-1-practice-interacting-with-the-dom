function convertToArray(array) {
  if (Array.isArray(array)) {
    const result = new Array(array.length);
    for (let i = 0; i < array.length; i++) {
      result[i] = array[i];
    }
    return result;
  }
  return Array.from(array);
}

let isPlaying = true;
const startCounter = function () {
  return setInterval(function () {
    const counterElement = document.getElementById("counter");
    const count = parseInt(counterElement.innerText);
    counterElement.innerText = count + 1;
  }, 1000);
};

let counterInterval = startCounter();
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const commentForm = document.getElementsByTagName("form")[0];

minusButton.addEventListener("click", function () {
  const counterElement = document.getElementById("counter");
  const count = parseInt(counterElement.innerText);
  counterElement.innerText = count - 1;
});

plusButton.addEventListener("click", function () {
  const counterElement = document.getElementById("counter");
  const count = parseInt(counterElement.innerText);
  counterElement.innerText = count + 1;
});

heartButton.addEventListener("click", function () {
  const counterElement = document.getElementById("counter");
  const count = parseInt(counterElement.innerText);
  const likesElement = document.querySelector(".likes");
  let existingLikeElement;

  const nums = convertToArray(likesElement.children).map(function (li) {
    return parseInt(li.dataset.num);
  });

  if (nums.includes(count)) {
    existingLikeElement = document.querySelector('[data-num="' + count + '"]');
    const currentLikes = parseInt(existingLikeElement.children[0].innerText);
    existingLikeElement.innerHTML = count + " has been liked <span>" + (currentLikes + 1) + "</span> times";
  } else {
    existingLikeElement = document.createElement("li");
    existingLikeElement.setAttribute("data-num", count);
    existingLikeElement.innerHTML = count + " has been liked <span>1</span> time";
    likesElement.appendChild(existingLikeElement);
  }
});

pauseButton.addEventListener("click", function () {
  if (isPlaying) {
    isPlaying = false;
    clearInterval(counterInterval);
    this.innerText = "resume";
  } else {
    isPlaying = true;
    counterInterval = startCounter();
    this.innerText = "pause";
  }

  const buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].id !== "pause") {
      buttons[i].disabled = !isPlaying;
    }
  }
});

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const commentInput = this.children[0];
  const comment = commentInput.value;
  commentInput.value = "";
  const commentsElement = document.querySelector(".comments");
  const newComment = document.createElement("p");
  newComment.innerText = comment;
  commentsElement.appendChild(newComment);
});
