import { configureStore } from "@reduxjs/toolkit";
import placesReducer from './slices/places';

const store = configureStore({
    reducer: {
        places: placesReducer
    }
})

export default store
