import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CartState = {
    itemsCount: number;
    cartId: number;
};

const initialState: CartState = {
    itemsCount: 0,
    cartId: -1,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increase: (
            state,
            action: PayloadAction<{ cnt: number; cartId: number }>
        ) => {
            state.itemsCount += action.payload.cnt;
            state.cartId = action.payload.cartId;
        },

        decrease: (
            state,
            action: PayloadAction<{ cnt: number; cartId: number }>
        ) => {
            state.itemsCount = Math.max(
                0,
                state.itemsCount - action.payload.cnt
            );
            state.cartId = action.payload.cartId;
        },

        reset: (state) => {
            state.itemsCount = 0;
            state.cartId = -1;
        },
    },
});

export const { increase, decrease, reset } = cartSlice.actions;
export default cartSlice.reducer;
