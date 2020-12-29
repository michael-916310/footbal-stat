import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameAreaSliceReducer from '../features/selectGameArea/gameAreaSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    gameArea: gameAreaSliceReducer,
  },
});
