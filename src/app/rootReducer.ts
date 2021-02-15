import { combineReducers } from '@reduxjs/toolkit';

import parentAreaReducer from '../features/selectParentArea/parentParentAreaSlice';
import areaReducer from '../features/selectArea/selectAreaSlice';
import yearReducer from '../features/selectYear/selectYearSlice';

const rootReducer = combineReducers({
  parentArea: parentAreaReducer,
  area: areaReducer,
  year: yearReducer,
})

export type tRootState = ReturnType<typeof rootReducer>

export default rootReducer

