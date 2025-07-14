import React, { useEffect, useState } from "react";
import { fetchGuardian } from "../api/guardian";
import { fetchNYT } from "../api/nyt";
import { fetchBBC } from "../api/bbc";
import ArticleCard from "./ArticleCard";
import type { NewsArticle } from "../types/news";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

const NewsFeed: React.FC<{ query: string; filters: { date?: string; source?: string } }> = ({ query, filters }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);

      let combined: NewsArticle[] = [];

      // Fetch from selected source or all
      try {
        if (filters.source === "The Guardian" || !filters.source) {
          const guardian = await fetchGuardian(query);
          combined = [...combined, ...guardian];
        }
        if (filters.source === "New York Times" || !filters.source) {
          const nyt = await fetchNYT();
          combined = [...combined, ...nyt];
        }
        if (filters.source === "BBC News" || !filters.source) {
          const bbc = await fetchBBC();
          combined = [...combined, ...bbc];
        }

        // Apply date filter
        if (filters.date) {
          combined = combined.filter((a) => {
            if (!a.publishedAt) return false;
            const articleDate = new Date(a.publishedAt).toISOString().slice(0, 10);
            return articleDate === filters.date;
          });
        }

        setArticles(combined);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [query, filters]);

  return (
    <>
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {!loading && articles.length === 0 && (
        <Alert variant="warning" className="text-center">
          No articles found. Try adjusting your search or filters.
        </Alert>
      )}

      <Row>
        {articles.map((article, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex">
            <ArticleCard article={article} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default NewsFeed;
