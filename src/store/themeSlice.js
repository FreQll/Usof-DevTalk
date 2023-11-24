import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "light",
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;

export default themeSlice.reducer;
