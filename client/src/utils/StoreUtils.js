import store from "store";

const KEY_ACCESS_TOKEN = "AccessToken";

export const getAccessToken = () => store.get(KEY_ACCESS_TOKEN);

export const saveAccessToken = data => {
  store.set(KEY_ACCESS_TOKEN, data);
};

export const removeAccessToken = () => {
  store.remove(KEY_ACCESS_TOKEN);
};

export const clearAll = () => {
  store.clearAll();
};
