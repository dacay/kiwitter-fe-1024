import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    count: 0
}

const twitsSlice = createSlice({
    name: 'twits',
    initialState,
    reducers: {
        load: (state, action) => {

            let twits = action.payload;

            state.data = twits;
            state.count = twits.length;
        }
    }
})

export const { load } = twitsSlice.actions;

export const getAllTwits = (state) => state.twits.data;

export default twitsSlice.reducer;