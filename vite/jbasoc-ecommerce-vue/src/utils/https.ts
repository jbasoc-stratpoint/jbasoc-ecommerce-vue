import t from "./tokenValidator";

const HTTP_REQUEST = {
  get: async (
    url: string,
    header = {},
    baseUrl = import.meta.env.VITE_API_URL,
  ) => {
    try {
      if (header) t.tokenValidator();

      const result = await fetch(baseUrl + url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          ...header,
        },
      });

      if (!result.ok) {
        const error_message = await result.json();
        console.log(error_message);
        throw new Error(error_message.error.message);
      }

      return await result.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  post: async (url: string, data = {}, header = {}) => {
    try {
      if (header) t.tokenValidator();

      const result = await fetch(import.meta.env.VITE_API_URL + url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...header,
        },
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        const error_message = await result.json();
        console.log(error_message);
        throw new Error(error_message.error.message);
      }

      return await result.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  //write bunch of methods like the above
};

export default HTTP_REQUEST;
