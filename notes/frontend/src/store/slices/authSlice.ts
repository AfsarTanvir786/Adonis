import type { User } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
};

const savedUser = localStorage.getItem('user');

const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : { name: 'no user' },
    isAuthenticated: !!savedUser,
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
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
