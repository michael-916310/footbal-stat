import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer
});

export type tAppDispatch = typeof store.dispatch

export default store;