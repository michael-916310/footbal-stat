import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import parentAreaReducer from '../features/selectParentArea/parentParentAreaSlice';
import areaReducer from '../features/selectArea/selectAreaSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  parentArea: parentAreaReducer,
  area: areaReducer,
})

export type tRootState = ReturnType<typeof rootReducer>

export default rootReducer

