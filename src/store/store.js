import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import themeReducer from "./themeSlice";

const saveUserToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.user);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    
  }
};

const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const loadFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const preloadedState = loadUserFromLocalStorage();
const preloadedThemeState = loadFromLocalStorage("themeState");

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    theme: themeReducer,
  },
  preloadedState: {
    user: preloadedState,
    theme: preloadedThemeState,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveUserToLocalStorage(state);
  saveToLocalStorage("themeState", state.theme);
});

export default store;