import axios from "axios";

export function countries() {
  return axios.get("https://restcountries.com/v2/all");
}
