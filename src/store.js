import { configureStore, createSlice } from "@reduxjs/toolkit";

// useState역할
let user = createSlice({
  name: "user",
  initialState: "kim",
  reducers: {
    changeName() {
      return "johnkim";
    },
  },
});

export let { changeName } = user.actions;

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
  reducers: {}, // 필요에 따라 reducer를 추가하거나 빈 객체를 넣어야 한다.
});

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    prchs: prchs.reducer,
  },
});
