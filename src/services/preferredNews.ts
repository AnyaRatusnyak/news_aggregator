import { News } from "../types/News";
import { getData } from "../utils/httpClient";

export function getPreferredNews(categories: string = "") {
  const url = categories
    ? `/articles/category?categories=${categories}`
    : `/articles/category`;

  return getData<News[]>(url);
}
