import React from "react";
import { Card, Badge } from "react-bootstrap";
import type { NewsArticle } from "../types/news";

const ArticleCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
  return (
    <Card className="mb-4 shadow-sm flex-fill">
      <Card.Img variant="top" src={article.image} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>
          <small className="text-muted">
            {new Date(article.publishedAt || "").toLocaleDateString()} |{" "}
            <Badge bg="info">{article.source}</Badge>
          </small>
        </Card.Text>
        <a
          href={article.url}
          className="btn btn-outline-primary w-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
