import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ComicDataSetModal } from "../../models/marvelApi.model";
import {  RecentComicsUrl } from "../marvelData";
import { log } from "console";



export const recentComicsApi = createAsyncThunk<ComicDataSetModal>(
    'api/MarvelRecentComics',
    async () => {      
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

      console.log({dataSet});
      
      return dataSet;
    });
    }
    )

export interface DataState {
    recentComics: ComicDataSetModal[] | null,
    isLoading: boolean,
    error: string | null;
}

const initialState: DataState = {
    recentComics: null,
    isLoading: false,
    error: null,
}

export const DataSlice = createSlice({
    name: 'data',
    initialState,
    // non async actions
    reducers: {},
    // for async actions
    extraReducers: (builder) => {
      console.log({builder});
      
        builder.addCase(recentComicsApi.pending, (state) => {          
          state.isLoading = true;
          state.error = null;
        });
        builder.addCase(recentComicsApi.fulfilled, (state, action) => {
          console.log('fulfilled fn');

          state.isLoading = false;
          state.recentComics?.push( action.payload);
        });
        builder.addCase(recentComicsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message ?? 'Something went wrong.';
        });
      },
})



export default DataSlice.reducer;
