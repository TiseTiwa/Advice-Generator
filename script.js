// Grab them all
let text = document.querySelector(".txt");
let adviceID = document.querySelector(".adv");
let quotesText = document.querySelector(".quo");
let button = document.querySelector(".glow");
let loading = document.querySelector(".loading");

let adviceData = async () => {
  try {
    let API = await fetch("https://labs.bible.org/api/?passage=random&type=json");
    let convertedData = await API.json();
    let verse = convertedData[0];

    loading.classList.add("hidden");
    adviceID.textContent = `BIBLE VERSE`;
    quotesText.innerHTML = `"${verse.bookname} ${verse.chapter}:${verse.verse} - ${verse.text}"`;
  } catch (error) {
    loading.classList.add("hidden");
    adviceID.textContent = "Error";
    quotesText.textContent = "Could not fetch a verse. Please try again.";
  }
};

button.addEventListener("click", () => {
  location.reload();
});
setTimeout(() => {
  adviceData();
}, 2000);

const searchBtn = document.getElementById("searchBtn");
const verseInput = document.getElementById("verseInput");

searchBtn.addEventListener("click", async () => {
  let query = verseInput.value.trim();
  if (!query) return;

  // Preprocess input to add space if missing
  query = formatVerseInput(query);

  loading.classList.remove("hidden");
  adviceID.textContent = "";
  quotesText.textContent = "";

  try {
    const formatted = encodeURIComponent(query);
    const API = await fetch(`https://labs.bible.org/api/?passage=${formatted}&type=json`);
    const data = await API.json();

    if (data.length === 0) {
      adviceID.textContent = "Not Found";
      quotesText.textContent = "No verse found for your search.";
    } else {
      const verse = data[0];
      adviceID.textContent = "BIBLE VERSE";
      quotesText.innerHTML = `"${verse.bookname} ${verse.chapter}:${verse.verse} - ${verse.text}"`;
    }
  } catch (error) {
    adviceID.textContent = "Error";
    quotesText.textContent = "Could not fetch the verse. Please try again.";
  }
  loading.classList.add("hidden");
});

function formatVerseInput(input) {
  // Insert a space before the first digit (chapter number)
  return input.replace(/([a-zA-Z])(\d)/, '$1 $2');
}

// async marks a function as asynchronous. it means the function will always return a promise.
// await can only be used inside an asynchronous function. it "pauses" that function execution untill the promise you're waiting for is resolved
