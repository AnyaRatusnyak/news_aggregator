import { SourceType } from "../types/SourceType";
import { getData } from "../utils/httpClient";

export function getSources() {
  return getData<SourceType[]>("/sources");
}
