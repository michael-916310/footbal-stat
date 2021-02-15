import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tRootState } from '../../app/rootReducer';
import { tAppDispatch } from '../../app/store';

interface iYearListItem {
  id: number;
  name: string;
}

const initialState = {
  id: -1,
  name: '',
  needResetViewValue: false,
  list: []
}

const yearSlice = createSlice({
  name: 'year',
  initialState,
  reducers: {
    setYearFullList: (state, action)=>{
      state.list = action.payload;
    },
    onSelectYear: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    onResetYear: (state) => {
      state.id = -1;
      state.name = '';
      state.needResetViewValue = true;
    },
    onResetViewValue: (state) => {
      state.needResetViewValue = false;
    }
  }
});

const {setYearFullList} = yearSlice.actions;

export const onYearFetched = (data: any) => (dispatch: tAppDispatch) => {
  dispatch(setYearFullList(data));
}

export const getSelectedYear = (state: tRootState) =>{
  return state.year;
}

export default yearSlice.reducer;