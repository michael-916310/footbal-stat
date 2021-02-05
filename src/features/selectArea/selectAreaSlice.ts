import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tRootState } from '../../app/rootReducer';
import { tAppDispatch } from '../../app/store';

export interface iAreaListItem {
  id: number;
  name: string;
}

export interface iArea {
  id: number;
  name: string;
  list: Array<iAreaListItem>;
}

const initialState: iArea = {
  id: 0,
  name: '',
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
    }
  },
});

const { setAreaFullList } = areaSlice.actions;

export const onAreaFetched = (data: any) => (dispatch: tAppDispatch) => {
  const list: Array<iAreaListItem> = data.areas.map((item: any)=>{
    return {
      id: item.id,
      name: item.name,
    }
  });

  dispatch(setAreaFullList(list));
};

export const getFullListToSelect = (state: tRootState) => {
  return [...state.area.list];
};

export const getSelectedArea = (state: tRootState) => {
  return {...state.area}
}

export const { onSelectArea } = areaSlice.actions;
export default areaSlice.reducer;
