import { createSlice } from '@reduxjs/toolkit';

export const parentAreaSlice = createSlice({
  name: 'parentArea',
  initialState: {
    id: 0,
    name: '',
    list:[],
  },
  reducers: {
    setList: (state, action)=>{
      state.list = action.payload;
    },
    setId: (state, action)=>{
      state.id = action.payload;
    },
    setName: (state, action)=>{
      state.name = action.payload;
    }
  },
});

export const { setList, setId, setName } = parentAreaSlice.actions;

export const parentAreaFetched = data => dispatch => {
  const m = new Map();

  data.areas.map((item)=>{
    return {
      id: item.parentAreaId,
      name: item.parentArea,
    }
  }).forEach(el => {
    if (!m.has(el.id) && el.id) {
      m.set(el.id, {...el});
    }
  });

  const list = [...m.values()];
  dispatch(setList(list));
};

export const selectedId = state => state.parentArea.id;
export const selectedName = state => state.parentArea.name;
export const fullListToSelect = state => {
  return state.parentArea.list;
};


export default parentAreaSlice.reducer;
