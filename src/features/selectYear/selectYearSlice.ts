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
  if (data.selectedArea) {
    const name = data.selectedArea.areaName;
    if (name) {
      const compArr = data.competitions.filter((item: any)=>{
        return (item.area.name === name);
      });
      console.log(compArr);

      const yearsArr: any[]=[];
      compArr.forEach((item: any) => {
        let start = new Date(item.currentSeason.startDate).getFullYear();
        const end = new Date(item.currentSeason.endDate).getFullYear();
        while (start<=end) {
          if (!yearsArr.includes(start)) {
            yearsArr.push(start);
          }
          start ++;
        }
      });

      yearsArr.sort((a,b) => a-b);

      dispatch(setYearFullList(yearsArr.map((el)=> {
        return {
          id: el,
          name: '' + el,
        }
      })));
      return;
    }
  }
  dispatch(setYearFullList([]));
}

export const getSelectedYear = (state: tRootState) =>{
  return state.year;
}

export const { onSelectYear, onResetYear, onResetViewValue} = yearSlice.actions;

export default yearSlice.reducer;