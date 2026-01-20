import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: { email: string } | null;
}

const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string; user: { email: string } }>) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
