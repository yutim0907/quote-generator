const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("quote-author");
const btnTwitter = document.getElementById("btn-twitter");
const btnNewQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

// Loading
function loading(toggle) {
  loader.hidden = !toggle;
  quoteContainer.hidden = toggle;
}

// Show New Quote
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function newQuote() {
  loading(true);
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[getRandomInt(apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  loading(false);
}
// Get Quote from API
const quotesAPIURL =
  "https://jacintodesign.github.io/quotes-api/data/quotes.json";

async function getQuotes() {
  loading(true);
  try {
    //Start getting quotes
    const response = await fetch(quotesAPIURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error Here
    console.error("error occured : ", error);
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterIntentUrl, "_blank");
}
// Event Listeners
btnNewQuote.addEventListener("click", newQuote);
btnTwitter.addEventListener("click", tweetQuote);
// Onload
getQuotes();
