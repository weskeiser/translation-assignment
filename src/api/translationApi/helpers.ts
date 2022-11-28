export const baseUrl = "https://translation-wes.herokuapp.com";

export const fetchWithBQ = async (url: string, options?: any) => {
  return fetch(`${baseUrl}/translations${url}`, {
    headers: {
      "X-API-Key": "98osduf98sdlkfj342sdlkfj",
      "Content-Type": "application/json",
    },
    ...options,
  })
    .then((res) => {
      if (!res.ok) {
        console.log(res);
      }
      return res.json();
    })
    .then((data) => data);
};
