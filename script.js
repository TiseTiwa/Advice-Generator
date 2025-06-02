// Grab them all
let text = document.querySelector(".txt");
let adviceID = document.querySelector(".adv");
let quotesText = document.querySelector(".quo");
let button = document.querySelector(".glow");
let loading = document.querySelector(".loading");

let adviceData = async () => {
  let API = await fetch("https://api.adviceslip.com/advice");

  let convertedData = await API.json();

  loading.classList.add("hidden");
  adviceID.textContent = `A D V I C E #${convertedData.slip.id}`;
  quotesText.textContent = `"${convertedData.slip.advice}"`;
};

button.addEventListener("click", () => {
  location.reload();
});
setTimeout(() => {
  adviceData();
}, 2000);

// async marks a function as asynchronous. it means the function will always return a promise.
// await can only be used inside an asynchronous function. it "pauses" that function execution untill the promise you're waiting for is resolved
