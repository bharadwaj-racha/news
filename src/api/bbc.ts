import axios from "axios";
import type { NewsArticle } from "../types/news";

export async function fetchBBC(query = ""): Promise<NewsArticle[]> {
  const rssURL = encodeURIComponent("https://feeds.bbci.co.uk/news/rss.xml");
  const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${rssURL}`);

  let articles: NewsArticle[] = response.data.items.slice(0, 30).map((item: any) => ({
    title: item.title,
    url: item.link,
    image: item.thumbnail || "https://via.placeholder.com/400x250?text=No+Image",
    source: "BBC News",
    publishedAt: item.pubDate,
  }));

  // Filter by query if present
  if (query) {
    articles = articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));
  }

  return articles;
}
