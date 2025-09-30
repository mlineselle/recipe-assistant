import { configureStore } from '@reduxjs/toolkit'
import ApplicationReducer from './ApplicationSlice'

const store = configureStore({
  reducer: {
    application: ApplicationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;