import axios from "axios";
import type { NewsArticle } from "../types/news";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300x150?text=No+Image";

export async function fetchNYT(query = ""): Promise<NewsArticle[]> {
  try {
    const rssUrl = encodeURIComponent("https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml");
    const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);

    let articles: NewsArticle[] = response.data.items.slice(0, 30).map((item: any) => ({
      title: item.title,
      url: item.link,
      image: item.thumbnail || PLACEHOLDER_IMAGE,
      source: "New York Times",
      publishedAt: item.pubDate,
    }));

    // Filter by query if present
    if (query) {
      articles = articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));
    }

    return articles;
  } catch (error) {
    console.error("Error fetching NYT RSS feed:", error);
    return [];
  }
}
