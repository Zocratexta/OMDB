import { configureStore } from "@reduxjs/toolkit"

import userReducer from "./user";
import moviesReducer from "./movies";
import singleMovieReducer from "./singleMovie";
import favoritesReducer from "./favorite"

const store = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        singleMovie: singleMovieReducer,
        favorites: favoritesReducer,
    }
});

export default store;
