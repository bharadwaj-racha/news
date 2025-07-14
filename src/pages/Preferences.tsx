import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const Preferences: React.FC = () => {
  const [sources, setSources] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  // ✅ Load preferences from localStorage on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem("newsPreferences");
    if (savedPrefs) {
      const parsedPrefs = JSON.parse(savedPrefs);
      if (parsedPrefs.sources) setSources(parsedPrefs.sources);
      if (parsedPrefs.categories) setCategories(parsedPrefs.categories);
      if (parsedPrefs.authors) setAuthors(parsedPrefs.authors);
    }
  }, []);

  const handleSave = () => {
    const preferences = { sources, categories, authors };
    localStorage.setItem("newsPreferences", JSON.stringify(preferences));
    alert("✅ Preferences saved!");
  };

  const toggleSelection = (
    value: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4">⚙️ Preferences</h2>

        {/* Preferred Sources */}
        <Form.Group className="mb-4">
          <Form.Label>📰 Preferred Sources</Form.Label>
          {["The Guardian", "New York Times", "BBC News"].map((source) => (
            <Form.Check
              key={source}
              type="checkbox"
              label={source}
              checked={sources.includes(source)}
              onChange={() =>
                toggleSelection(source, sources, setSources)
              }
            />
          ))}
        </Form.Group>

        {/* Preferred Categories */}
        <Form.Group className="mb-4">
          <Form.Label>📂 Preferred Categories</Form.Label>
          {["Politics", "Sports", "Technology", "Business"].map((category) => (
            <Form.Check
              key={category}
              type="checkbox"
              label={category}
              checked={categories.includes(category)}
              onChange={() =>
                toggleSelection(category, categories, setCategories)
              }
            />
          ))}
        </Form.Group>

        {/* Preferred Authors */}
        <Form.Group className="mb-4">
          <Form.Label>✍️ Preferred Authors</Form.Label>
          {["John Doe", "Jane Smith", "Robert Brown"].map((author) => (
            <Form.Check
              key={author}
              type="checkbox"
              label={author}
              checked={authors.includes(author)}
              onChange={() =>
                toggleSelection(author, authors, setAuthors)
              }
            />
          ))}
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleSave}
          className="mt-2"
        >
          💾 Save Preferences
        </Button>
      </Card>
    </Container>
  );
};

export default Preferences;
