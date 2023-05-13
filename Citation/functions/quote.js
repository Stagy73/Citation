import React, { useEffect, useState } from "react";
import axios from "axios";

const Citation = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const storedQuote = localStorage.getItem("quote");
        const storedDate = localStorage.getItem("quoteDate");

        // Check if a quote is stored and the stored date is today
        if (storedQuote && storedDate && isToday(new Date(storedDate))) {
          setQuote(JSON.parse(storedQuote));
        } else {
          const response = await axios.get("/.netlify/functions/quote");
          const selectedQuote = response.data;
          setQuote(selectedQuote);
          localStorage.setItem("quote", JSON.stringify(selectedQuote));
          localStorage.setItem("quoteDate", new Date().toISOString());
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  // Function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div>
      {quote ? (
        <div>
          <p className="displayText">{quote.quote}</p>
          <p className="displayAuthor">- {quote.author}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Citation;
