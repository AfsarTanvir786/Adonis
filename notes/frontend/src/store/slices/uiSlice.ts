import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UiState = {
    backgroud: 'black' | 'white';
    sidebar: 'close' | 'open';
    model: 'close' | 'open';
};

const initialState: UiState = {
    backgroud: 'white',
    sidebar: 'open',
    model: 'open',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        theme: (state, action: PayloadAction<{ bg: 'black' | 'white' }>) => {
            state.backgroud = action.payload.bg;
        },

        sidebar: (
            state,
            action: PayloadAction<{ sidebar: 'close' | 'open' }>
        ) => {
            state.sidebar = action.payload.sidebar;
        },

        model: (state, action: PayloadAction<{ model: 'close' | 'open' }>) => {
            state.model = action.payload.model;
        },
    },
});

export const { theme, sidebar, model } = uiSlice.actions;
export default uiSlice.reducer;
