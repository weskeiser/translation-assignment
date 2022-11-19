import { baseURL } from "api";

export const fetchHistoryAPI = () => {
  return fetch(`${baseURL}/translations?id=1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const addToHistoryAPI = (addition: string[]) => {
  return fetch(`${baseURL}/translations/1`, {
    method: "PATCH",
    headers: {
      "X-API-Key": "98osduf98sdlkfj342sdlkfj",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      translations: addition,
    }),
  }).then((res) => res.json());
};
