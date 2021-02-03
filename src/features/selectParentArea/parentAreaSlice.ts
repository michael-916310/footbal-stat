import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tRootState } from './../../app/rootReducer';
import { tAppDispatch } from './../../app/store';

export interface iParentAreaList {
  id: number;
  name: string;
}

export interface iParentArea {
  id: number;
  name: string;
  list: Array<iParentAreaList>;
}


const initialState: iParentArea = {
  id: 0,
  name: '',
  list:[],
}

export const parentAreaSlice = createSlice({
  name: 'parentArea',
  initialState,
  reducers: {
    setList: (state: iParentArea, action: PayloadAction<Array< iParentAreaList >>)=>{
      state.list = action.payload;
    },
    setId: (state: iParentArea, action: PayloadAction<number>)=>{
      state.id = action.payload;
    },
    setName: (state: iParentArea, action: PayloadAction<string>)=>{
      state.name = action.payload;
    }
  },
});

export const { setList, setId, setName } = parentAreaSlice.actions;

export const parentAreaFetched = (data: any) => (dispatch: tAppDispatch) => {
  const m = new Map();

  data.areas.map((item: any)=>{
    return {
      id: item.parentAreaId,
      name: item.parentArea,
    }
  }).forEach((el: iParentAreaList) => {
    if (!m.has(el.id) && el.id) {
      m.set(el.id, {...el});
    }
  });

  const list: Array<iParentAreaList> = [...m.values()];
  dispatch(setList(list));
};

export const selectedId = (state: tRootState) => state.parentArea.id;
export const selectedName = (state: tRootState) => state.parentArea.name;
export const fullListToSelect = (state: tRootState) => {
  return state.parentArea.list;
};


export default parentAreaSlice.reducer;
