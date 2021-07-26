import { createReducer, createAction }from "@reduxjs/toolkit"

export const userFavourites = createAction("USER_FAV")

const userReducer = createReducer([], {
    [userFavourites] : (state, action) => action.payload
})

export default userReducer;

