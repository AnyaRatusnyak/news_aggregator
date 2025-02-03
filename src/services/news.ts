import { News } from "../types/News";
import { getData } from "../utils/httpClient";

export function getNews(url: string) {
  return getData<News[]>(url); 
}