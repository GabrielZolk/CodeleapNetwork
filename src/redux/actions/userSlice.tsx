import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem('user') || '',
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('user', action.payload);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
