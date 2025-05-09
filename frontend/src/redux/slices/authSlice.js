import { createSlice } from '@reduxjs/toolkit';
import { AuthPrivateThunk, AuthPublicThunk } from '../thunks/authThunk';
import Cookies from 'js-cookie';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: Cookies.get('accessToken'),
        loading: false,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(AuthPublicThunk.loginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(AuthPublicThunk.loginThunk.fulfilled, (state) => {
                state.accessToken = Cookies.get('accessToken');
                state.loading = false;
            })
            .addCase(AuthPublicThunk.loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            });
        // Oauth2 Register User
        builder
            .addCase(AuthPublicThunk.oauth2RegisterUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(AuthPublicThunk.oauth2RegisterUserThunk.fulfilled, (state) => {
                state.accessToken = Cookies.get('accessToken');
                state.loading = false;
            })
            .addCase(AuthPublicThunk.oauth2RegisterUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            });
        // Oauth2 Login
        builder
            .addCase(AuthPublicThunk.oauth2AuthorisingThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(AuthPublicThunk.oauth2AuthorisingThunk.fulfilled, (state) => {
                state.accessToken = Cookies.get('accessToken');
                state.loading = false;
            })
            .addCase(AuthPublicThunk.oauth2AuthorisingThunk.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            });
        // Logout
        builder
            .addCase(AuthPrivateThunk.logoutThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(AuthPrivateThunk.logoutThunk.fulfilled, (state) => {
                state.accessToken = '';
                state.loading = false;
            })
            .addCase(AuthPrivateThunk.logoutThunk.rejected, (state, action) => {
                state.accessToken = '';
                state.loading = false;
                state.message = action.payload.message;
            });
    },
});

export default authSlice.reducer;
