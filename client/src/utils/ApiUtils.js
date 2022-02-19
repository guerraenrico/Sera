/* eslint quote-props: ["error", "consistent"] */

function ApiException(error) {
  this.message = error.message;
}

export const Methods = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const fullUrl = (url) => `${API_URL}${url}`;

const baseRequestParams = (token) => ({
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "x-token": token,
  },
});

const createPostRequest = (baseParams) => (url, options = {}) =>
  fetch(url, {
    ...baseParams,
    method: "POST",
    body: JSON.stringify(options),
  });

const createGetRequest = (baseParams) => (url, options = {}) => {
  let finalUrl = `${url}?`;
  Object.entries(options).forEach(([key, value], poition) => {
    finalUrl = `${finalUrl}${poition > 0 ? "&" : ""}${key}=${value}`;
  });
  return fetch(finalUrl, {
    ...baseParams,
    method: "GET",
  });
};

const createDeleteRequest = (baseParams) => (url, options) => {
  const finalUrl = `${url}/${options}`;
  return fetch(finalUrl, {
    ...baseParams,
    method: "DELETE",
  });
};

const createPatchRequest = (baseParams) => (url, options = {}) =>
  fetch(url, {
    ...baseParams,
    method: "PATCH",
    body: JSON.stringify(options),
  });

const createRequest = (url, options, method, token) => {
  const baseParams = baseRequestParams(token);
  const finalUrl = fullUrl(url);
  switch (method) {
    case Methods.POST:
      return createPostRequest(baseParams)(finalUrl, options);
    case Methods.GET:
      return createGetRequest(baseParams)(finalUrl, options);
    case Methods.DELETE:
      return createDeleteRequest(baseParams)(finalUrl, options);
    case Methods.PATCH:
      return createPatchRequest(baseParams)(finalUrl, options);
    default:
      return createPostRequest(baseParams)(finalUrl, options);
  }
};

export const callApi = (url, options = {}, method = Methods.POST, token = "") =>
  createRequest(url, options, method, token).then(
    (response) => response.json(),
    (error) => {
      throw new ApiException(error);
    }
  );

export default callApi;
