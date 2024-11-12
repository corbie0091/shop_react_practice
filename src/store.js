import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let prchs = createSlice({
  name: "prchs",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let item = state.find((item) => item.id === action.payload);
      if (item) {
        item.count += 1;
      }
    },

    addCartList(array, action) {
      return [
        ...array.slice(0, action.index),
        action.item,
        ...array.slice(action.index),
      ];
    },
  },
});

export let { addCount, addCartList } = prchs.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    prchs: prchs.reducer,
  },
});
