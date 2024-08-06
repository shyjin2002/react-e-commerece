import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: false };

const userSlice = createSlice({
  name: 'userExist',
  initialState,
  reducers: {
    isExist: (state) => {
      state.value =true;
    },
    isNotExist: (state) => {
      state.value =false;
    },
  },
});

export const { isExist, isNotExist } = userSlice.actions;

export default userSlice.reducer;