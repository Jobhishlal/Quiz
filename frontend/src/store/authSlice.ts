import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: { email: string; username?: string } | null;
}

const loadState = (): AuthState => {
    try {
        const serializedState = localStorage.getItem('auth');
        if (serializedState === null) {
            return {
                accessToken: null,
                isAuthenticated: false,
                user: null,
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            accessToken: null,
            isAuthenticated: false,
            user: null,
        };
    }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string; user: { email: string; username?: string } }>) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem('auth', JSON.stringify(state));
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('auth');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
