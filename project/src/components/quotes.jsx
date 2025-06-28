import { useState, useEffect } from "react";
import "./quotes.css"; // Ensure you have a CSS file for styling

export default function quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const quotes = [
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" }
  ];

  const fetchQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex].text);
    setAuthor(quotes[randomIndex].author);
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 15000); // new quote every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-widget">
      <p className="quote">"{quote}"</p>
      <p className="author">- {author}</p>
    </div>
  );
}
