import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ComicDataSetModal } from "../../models/marvelApi.model";
import { RecentComicsUrl, SearchedComicsUrl } from "../marvelData";

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

export const searchedComicsApi = createAsyncThunk(
  "marvelApi/MarvelSearchedComics",
  async (titleSearched: string, { rejectWithValue }) => {
    try {
      const comicData = (
        await axios.get(await SearchedComicsUrl(titleSearched))
      ).data.data.results;

      return comicData.filter((recentComics: ComicDataSetModal) => {
        const dataSet = [];
        dataSet.push(
          recentComics.title,
          recentComics.dates[0],
          recentComics.thumbnail.path
        );
        return dataSet;
      });
    } catch (error) {
      rejectWithValue(error);
      console.error(`Recent comics Error: ${error}`);
    } finally {
      console.warn("call for Searched series successful");
    }
  }
);

export interface DataState {
  recentComics: ComicDataSetModal[];
  searchedComics: ComicDataSetModal[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DataState = {
  recentComics: [],
  searchedComics: [],
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
      state.error = null;
    });
    builder.addCase(recentComicsApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recentComics = action.payload;
    });
    builder.addCase(recentComicsApi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    builder.addCase(searchedComicsApi.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchedComicsApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchedComics = action.payload;
    });
    builder.addCase(searchedComicsApi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default DataSlice;
