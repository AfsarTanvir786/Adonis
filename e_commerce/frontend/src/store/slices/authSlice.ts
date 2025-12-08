import type { User } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    user: Partial<User>;
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    user: { fullName: 'no user' },
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },

        clearUser: (state) => {
            state.user = { fullName: 'no user' };
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
