import { combineReducers } from '@reduxjs/toolkit';

import parentAreaReducer from '../features/selectParentArea/parentParentAreaSlice';
import areaReducer from '../features/selectArea/selectAreaSlice';

const rootReducer = combineReducers({
  parentArea: parentAreaReducer,
  area: areaReducer,
})

export type tRootState = ReturnType<typeof rootReducer>

export default rootReducer

