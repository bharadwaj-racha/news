import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";

interface FiltersProps {
  onFilterChange: (filters: { date?: string; source?: string }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  return (
    <Card className="p-3 mb-4 shadow-sm">
      <h5 className="mb-3">🛠 Filter Articles</h5>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>📅 Filter by Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => onFilterChange({ date: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>📰 Filter by Source</Form.Label>
            <Form.Select
              onChange={(e) => onFilterChange({ source: e.target.value })}
            >
              <option value="">All Sources</option>
              <option value="The Guardian">The Guardian</option>
              <option value="New York Times">New York Times</option>
              <option value="BBC News">BBC News</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Card>
  );
};

export default Filters;
