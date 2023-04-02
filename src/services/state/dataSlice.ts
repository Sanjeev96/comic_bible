import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ComicDataSetModal } from "../../models/marvelApi.model";
import { RecentComicsUrl } from "../marvelData";

export const recentComicsApi = createAsyncThunk(
  "marvelApi/MarvelRecentComics",
  async (arg, { rejectWithValue }) => {
    try {
      const comicData = (await axios.get(RecentComicsUrl())).data.data.results;
      return comicData.map((recentComics: ComicDataSetModal) => {
        const dataSet: ComicDataSetModal = {
          id: recentComics.id,
          title: recentComics.title,
          thumbnail: recentComics.thumbnail,
          dates: recentComics.dates.filter((d) => {
            return d.date ? d.type === "onsaleDate" : [];
          }),
        };
        return dataSet;
      });
    } catch (error) {
      rejectWithValue(error);
      console.error(`Recent comics Error: ${error}`);
    } finally {
      console.warn("call for recent comics successful");
    }
  }
);

// export interface DataState {
//   recentComics: ComicDataSetModal[] | null;
//   isLoading: boolean;
//   error: string | null;
// }

const initialState = {
  recentComics: [],
  isLoading: false,
  error: "null",
};

export const DataSlice = createSlice({
  name: "marvelApi",
  initialState,
  // non async actions
  reducers: {},
  // for async actions
  extraReducers: (builder) => {
    builder.addCase(recentComicsApi.pending, (state) => {
      state.isLoading = true;
      // state.error = null;
    });
    builder.addCase(recentComicsApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recentComics = action.payload;
    });
    builder.addCase(recentComicsApi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default DataSlice;
