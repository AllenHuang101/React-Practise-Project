import { get, post } from "../utils/http/request";

interface LoginData {
  username: string;
  password: string;
}

export function login(data: LoginData) {
  return post("/login", data);
}

export function getMenu() {
  return get("/menu");
}
