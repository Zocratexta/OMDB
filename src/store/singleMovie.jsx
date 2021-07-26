import { createReducer, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getSingleMovie = createAsyncThunk("SINGLE_MOVIE", (movieId) => {
    return axios.get(`http://www.omdbapi.com/?apikey=46957909&i=${movieId}`).then(res => res.data)
});

const singleMovieReducer = createReducer({}, {
    [getSingleMovie.fulfilled] : (state, action) => action.payload
});

export default singleMovieReducer;
