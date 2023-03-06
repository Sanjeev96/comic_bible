import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUiState {
  search: string;
  loading: boolean;
}

const initialState: IUiState = {
  search: "",
  loading: false,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export default UiSlice.reducer;
export const { setSearch } = UiSlice.actions;