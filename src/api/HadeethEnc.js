const BASE_URL = "https://hadeethenc.com/api/v1";

export default (url, options) => {
  return fetch(`${BASE_URL}${url}`, options);
};
