import type { User } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; accessToken: string }>
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },

        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
});

export const { setCredentials, logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
