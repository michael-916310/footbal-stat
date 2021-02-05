import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tRootState } from '../../app/rootReducer';
import { tAppDispatch } from '../../app/store';

export interface iAreaList {
  id: number;
  name: string;
}

export interface iArea {
  id: number;
  name: string;
  list: Array<iAreaList>;
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
    setList: (state: iArea, action: PayloadAction<Array< iAreaList >>)=>{
      state.list = action.payload;
    },
    setId: (state: iArea, action: PayloadAction<number>)=>{
      state.id = action.payload;
    },
    setName: (state: iArea, action: PayloadAction<string>)=>{
      state.name = action.payload;
    }
  },
});

export const { setList, setId, setName } = areaSlice.actions;

export const areaFetched = (data: any) => (dispatch: tAppDispatch) => {
  const m = new Map();

  data.areas.map((item: any)=>{
    return {
      id: item.id,
      name: item.name,
    }
  }).forEach((el: iAreaList) => {
    if (!m.has(el.id) && el.id) {
      m.set(el.id, {...el});
    }
  });

  const list: Array<iAreaList> = [...m.values()];
  dispatch(setList(list));
};

export const selectedId = (state: tRootState) => state.area.id;
export const selectedName = (state: tRootState) => state.area.name;
export const fullListToSelect = (state: tRootState) => {
  return state.area.list;
};


export default areaSlice.reducer;
