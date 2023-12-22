import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Loader } from "react-feather";
import Quotes from "./components/quotes/Quotes";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setFavoriteQuotes]= useState([]);
  const maxFaves=3;
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
    const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(quotesUrl);
      const results = await response.json();
      setQuotes(results);
    } catch (e) {
      console.log("oops", e);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchQuotes();
  }, []);

  const filteredQuotes = category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    };
  
    const addToFavorites = (quoteId) => {
const selectedQuote = quotes.find((quote) => quote.id === quoteId);

const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id);

if (alreadyFavorite) {
  console.log("You already selected this quote!")
}

else if (favoriteQuotes.length < maxFaves) {
  setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
  console.log("Added to your favorites!");
} else {
  console.log("Max number of favorites reached. Please delete one to add a new favorite.");
} 
    };

  return (
    <div className='App'>
      <Header />
      <main>
        <section className="favorite-quotes">
          <div className="wrapper quotes">
            <h3>Top 3 Favorite Quotes</h3>
            {favoriteQuotes.length>0 && JSON.stringify(favoriteQuotes)};
          </div>

        </section>
        {loading ? (
      <Loader />
      ) : (
      <Quotes 
      filteredQuotes={filteredQuotes}
      category={category}
      categories={categories}
      handleCategoryChange={handleCategoryChange} 
      addToFavorites={addToFavorites}
      />)}</main>
      <Footer />
    </div>
  );
}
export default App;
