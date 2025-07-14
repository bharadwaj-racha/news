import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import NewsFeed from "../components/NewsFeed";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<{ date?: string; source?: string }>({});

  return (
    <div className="container py-4">
      {/* ✅ Added Title */}
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold">
          📰 Your Personalized News Aggregator
        </h1>
        <p className="lead text-muted">
          Search and filter news from The Guardian, New York Times, and BBC News.
        </p>
      </div>

      {/* Existing components */}
      <SearchBar onSearch={setQuery} />
      <Filters onFilterChange={setFilters} />
      <NewsFeed query={query} filters={filters} />
    </div>
  );
};

export default Home;
