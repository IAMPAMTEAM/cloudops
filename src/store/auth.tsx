import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'login',
  // TODO: 임시 로그인 정보
  initialState: { value: { email: 'admin@iampam.io', password: 'dkdldpavka1@#' } },
  // initialState: { value: { email: '', password: '' } },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { login } = userSlice.actions;
