import { createSlice } from "@reduxjs/toolkit";


const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        //  popularMovies:null,
        //  upcomingMovies:null,
    },
    reducers: {
addNowPlayingMovies : (state, action) => {
    state.nowPlayingMovies = action.payload;
},
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addTopRated: (state, action) => {
            state.addTopRated = action.payload;
        },

addTrailerVideo:(state, action) => {
state.trailerVideo = action.payload;
},

    },
});

export const { addNowPlayingMovies, addTrailerVideo,addUpcomingMovies, addPopularMovies,addTopRated } = moviesSlice.actions;

export default moviesSlice.reducer;
