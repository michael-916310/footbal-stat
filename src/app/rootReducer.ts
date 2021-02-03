import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import parentAreaReducer from '../features/selectParentArea/parentAreaSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  parentArea: parentAreaReducer,
})

export type tRootState = ReturnType<typeof rootReducer>

export default rootReducer

