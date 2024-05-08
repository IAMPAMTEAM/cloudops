import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: 'login',
    initialState: { value: { email: '', password: '' } },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
    },
});
export default userSlice.reducer;
export const { login } = userSlice.actions;
