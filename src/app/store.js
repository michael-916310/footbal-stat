import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import parentAreaReducer from '../features/selectParentArea/parentAreaSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    parentArea: parentAreaReducer,
  },
});

