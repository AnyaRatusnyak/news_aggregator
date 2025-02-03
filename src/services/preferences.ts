import { getData, updateData } from "../utils/httpClient";
import { UserData } from "../types/UserData";

export function getPreferences(userId: string) {
  return getData<string[]>(`/users/preferences/${userId}`);
}

export function updateUserPreferences(userId: string, userData: UserData) {
  return updateData(`/users/preferences/${userId}`, userData);
}
