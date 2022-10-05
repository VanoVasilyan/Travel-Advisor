import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getPlacesData = createAsyncThunk('placesData', async ({ bounds: { sw, ne }, type }) => {

    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            {
                params: {
                    bl_latitude: sw.lat,
                    tr_latitude: ne.lat,
                    bl_longitude: sw.lng,
                    tr_longitude: ne.lng,
                },
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            });
        return data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    places: [],
    status: 'loading'
}

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {},
    extraReducers: {
        [getPlacesData.pending]: (state) => {
            state.places = [];
            state.status = 'loading';
        },
        [getPlacesData.fulfilled]: (state, action) => {
            state.places = action.payload.filter(place => place.name && place.num_reviews)
            state.status = 'loaded';
        },
        [getPlacesData.rejected]: (state) => {
            state.places = [];
            state.status = 'error';
        },
    }
})

export default placesSlice.reducer;