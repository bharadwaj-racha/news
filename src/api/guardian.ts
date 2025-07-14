import axios from "axios";
import type { NewsArticle } from "../types/news";

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

export async function fetchGuardian(query = "", date?: string): Promise<NewsArticle[]> {
  const params: any = {
    "api-key": GUARDIAN_API_KEY,
    "show-fields": "thumbnail",
    q: query,
    "page-size": 20, // Fetch more articles per request
  };

  if (date) {
    params["from-date"] = date;
    params["to-date"] = date;
  }

  const response = await axios.get("https://content.guardianapis.com/search", {
    params,
  });

  return response.data.response.results.map((item: any) => ({
    title: item.webTitle,
    url: item.webUrl,
    image: item.fields?.thumbnail || "https://via.placeholder.com/400x250?text=No+Image",
    source: "The Guardian",
    publishedAt: item.webPublicationDate,
  }));
}
