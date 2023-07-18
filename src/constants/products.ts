import axios from "axios";

const baseUrl = "https://dummyjson.com/";
export const instance = axios.create({
  baseURL: baseUrl,
  //   headers: { "X-Custom-Header": "foobar" },
});

export default baseUrl;








