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

            twits.sort((t1, t2) => t2.createDate - t1.createDate);

            state.data = twits;
            state.count = twits.length;
        },
        post: (state, action) => {
            
            let twit = action.payload;

            state.data = [twit, ...state.data];
        },
        like: (state, action) => {

            let { id, count } = action.payload;

            state.data = state.data.map(t => {

                if (t.id === id) {

                    return {
                        ...t,
                        likes: count
                    }

                } else {

                    return t;
                }
            })
        }
    }
})

export const { load, post, like } = twitsSlice.actions;

export const getAllTwits = (state) => state.twits.data;

export default twitsSlice.reducer;