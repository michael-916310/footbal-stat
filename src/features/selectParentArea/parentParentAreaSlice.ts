import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tRootState } from '../../app/rootReducer';
import { tAppDispatch } from '../../app/store';

export interface iParentAreaListItem {
  id: number;
  name: string;
}

export interface iParentArea {
  id: number;
  name: string;
  list: Array<iParentAreaListItem>;
}

const initialState: iParentArea = {
  id: -1,
  name: '',
  list:[],
}

export const parentAreaSlice = createSlice({
  name: 'parentArea',
  initialState,
  reducers: {
    setFullAreaList: (state: iParentArea, action: PayloadAction<Array< iParentAreaListItem >>)=>{
      state.list = action.payload;
    },
    onSelectArea: (state: iParentArea, action: PayloadAction<iParentAreaListItem>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    }
  },
});

const { setFullAreaList  } = parentAreaSlice.actions;

export const parentAreaFetched = (data: any) => (dispatch: tAppDispatch) => {
  const m = new Map();

  data.areas.map((item: any)=>{
    return {
      id: item.parentAreaId,
      name: item.parentArea,
    }
  }).forEach((el: iParentAreaListItem) => {
    if (!m.has(el.id) && el.id) {
      m.set(el.id, {...el});
    }
  });

  const list: Array<iParentAreaListItem> = [...m.values()];
  dispatch(setFullAreaList(list));
};

export const getSelectedArea = (state: tRootState) => {
  return state.parentArea;
}

export const { onSelectArea } = parentAreaSlice.actions;

export default parentAreaSlice.reducer;
