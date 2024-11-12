import { createSlice } from "@reduxjs/toolkit";

// useState역할
let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "park";
    },
    increase(state) {
      state.age += 1;
    },
    increase2(state, a) {
      state.age += a.payload;
    },
  },
});

export let { changeName, increase, increase2 } = user.actions;

export default user;
