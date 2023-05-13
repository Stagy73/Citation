const express = require("express");
const fs = require("fs");
const cron = require("node-cron");

const app = express();
const dbFilePath = "./db.json";

let currentQuote = null;

// Function to fetch a random quote from the quotes in db.json
const fetchRandomQuote = () => {
  const data = JSON.parse(fs.readFileSync(dbFilePath));
  const quotes = data.quote;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIndex];
};

// Fetch a random quote initially
fetchRandomQuote();

// Schedule fetching a new random quote every day at 12:00 AM
cron.schedule("0 0 * * *", () => {
  fetchRandomQuote();
});

// Endpoint to fetch the current quote
app.get("/quote", (req, res) => {
  res.json(currentQuote);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default Citation;
