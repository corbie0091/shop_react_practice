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
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let item = state.find((item) => item.id === action.payload);
      if (item) {
        item.count += 1;
      }
    },

    addCartList(state, action) {
      let index = state.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index].count++;
      }
    },

    removeItem(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export let { addCount, addCartList, removeItem } = prchs.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    prchs: prchs.reducer,
  },
});
