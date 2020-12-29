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
      console.log('setList', action);
      state.list = action.payload;
    },
  },
});

export const {setList } = parentAreaSlice.actions;

export const parentAreaFetched = data => dispatch => {
  const m = new Map();

  console.log(`started: parentAreaFetched`);

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
export const listToSelect = state => state.parentArea.list;


export default parentAreaSlice.reducer;
