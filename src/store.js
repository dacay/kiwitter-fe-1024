import { configureStore } from '@reduxjs/toolkit'

import twitsReducer from './pages/twitsSlice';

export const store = configureStore({
  reducer: {
    twits: twitsReducer
  },
})