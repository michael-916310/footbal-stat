import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tRootState } from '../../app/rootReducer';
import { tAppDispatch } from '../../app/store';

export interface iAreaListItem {
  id: number;
  parentId: number;
  name: string;
}

export interface iArea {
  id: number;
  name: string;
  needResetViewValue: boolean;
  list: Array<iAreaListItem>;
}

const initialState: iArea = {
  id: -1,
  name: '',
  needResetViewValue: false,
  list:[],
}

export const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    setAreaFullList: (state: iArea, action: PayloadAction<Array<iAreaListItem>>)=>{
      state.list = action.payload;
    },
    onSelectArea: (state: iArea, action: PayloadAction<iAreaListItem>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    onResetArea: (state: iArea) => {
      state.id = -1;
      state.name = '';
      state.needResetViewValue = true;
    },
    onResetViewValue: (state: iArea) => {
      state.needResetViewValue = false;
    }
  },
});

const { setAreaFullList } = areaSlice.actions;

export const onAreaFetched = (data: any, parentId: number) => (dispatch: tAppDispatch) => {
  const list: Array<iAreaListItem> = data.areas.map((item: any)=>{
    return {
      id: item.id,
      parentId: item.parentAreaId,
      name: item.name,
    }
  }).filter((item: any) => {
    return (item.parentId === parentId)
  });

  dispatch(setAreaFullList(list));
};


export const getSelectedArea = (state: tRootState) => {
  return state.area;
}

export const { onSelectArea, onResetArea, onResetViewValue } = areaSlice.actions;
export default areaSlice.reducer;
