/* eslint quote-props: ["error", "consistent"] */

export const Methods = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

const fullUrl = url => `/api/${url}`;

const baseRequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

const createPostRequest = (url, options = {}) => (
  fetch(url, {
    ...baseRequestInit,
    method: 'POST',
    body: JSON.stringify(options),
  })
);

const createGetRequest = (url, options = {}) => {
  let finalUrl = `${url}?`;
  Object.entries(options).forEach(([key, value], poition) => {
    finalUrl = `${finalUrl}${(poition > 0) ? '&' : ''}${key}=${value}`;
  });
  return fetch(finalUrl, {
    ...baseRequestInit,
    method: 'GET',
  });
};

const createDeleteRequest = (url, options) => {
  const finalUrl = `${url}/${options}`;
  return fetch(finalUrl, {
    ...baseRequestInit,
    method: 'DELETE',
  });
};

const createPatchRequest = (url, options = {}) => (
  fetch(url, {
    ...baseRequestInit,
    method: 'PATCH',
    body: JSON.stringify(options),
  })
);

const createRequest = (url, options, method) => {
  const finalUrl = fullUrl(url);
  switch (method) {
    case Methods.POST: return createPostRequest(finalUrl, options);
    case Methods.GET: return createGetRequest(finalUrl, options);
    case Methods.DELETE: return createDeleteRequest(finalUrl, options);
    case Methods.PATCH: return createPatchRequest(finalUrl, options);
    default: return createPostRequest(finalUrl, options);
  }
};

export const callApi = (url, options = {}, method = Methods.POST) => (
  createRequest(url, options, method).then(
    response => (response.ok ?
      response.json() :
      Promise.reject(response.text())
    ),
    error => Promise.reject(error),
  )
);

export default callApi;

