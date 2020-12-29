import { createSlice } from '@reduxjs/toolkit';

export const parentAreaSlice = createSlice({
  name: 'parentArea',
  initialState: {
    id: 0,
    name: '',
    list:[],
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = parentAreaSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

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
  console.log(list);
};

export const selectId = state => state.parentArea.id;
export const selectName = state => state.parentArea.name;

export default parentAreaSlice.reducer;
