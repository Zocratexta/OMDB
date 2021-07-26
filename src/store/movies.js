import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk("MOVIES", (movie) => {
    return axios.get(`http://www.omdbapi.com/?apikey=46957909&s=${movie}`).then(res => res.data.Search)
});

const moviesReducer = createReducer([], {
    [getMovies.fulfilled]: (state, action) => action.payload,
} );

export default moviesReducer;
