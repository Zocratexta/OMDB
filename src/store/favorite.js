import { createReducer, createAsyncThunk}from "@reduxjs/toolkit"
import axios from "axios"

export const getFavorites = createAsyncThunk("FAVORITES", () => {
    return axios.get("/api/favorites")
        .then(res => res.data)
})
export const dropFavorites = createAsyncThunk("DROP_FAVORITE", (id) => {
    return axios.delete(`/api/favorites/${id}`)
        .then(() => {
            return axios.get("/api/favorites")
                .then(res => res.data)
        })
})

const favoritesReducer= createReducer([], {
    [getFavorites.fulfilled] : (state, action) => action.payload,
    [dropFavorites.fulfilled] : (state, action) => action.payload
})

export default favoritesReducer;

