import { UserData } from "../types/UserData";
import { postData } from "../utils/httpClient";

export function registerUser(userData: UserData) {
  return postData("/auth/registration", userData);
}

export function signInUser(userData: UserData) {
  return postData("/auth/login", userData);
}
