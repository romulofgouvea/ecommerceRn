import * as SecureStore from "expo-secure-store";

async function setItem(key, value, alias = "") {
  let options = {
    keychainService: alias
  };
  await SecureStore.setItemAsync(key, value, options);
}

async function getItem(key, alias = "") {
  let options = {
    keychainService: alias
  };
  return await SecureStore.getItemAsync(key, options);
}

async function deleteItem(key, alias = "") {
  let options = {
    keychainService: alias
  };
  await SecureStore.deleteItemAsync(key, options);
}

export const Store = { setItem, getItem, deleteItem };
