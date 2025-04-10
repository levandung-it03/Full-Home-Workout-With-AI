import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthPrivateService, AuthPublicService } from '~/services/authService';
import { Oauth2PublicService } from '~/services/oauth2Service';


export class AuthPrivateThunk {
    static logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
        try {
            return await AuthPrivateService.logout();
        } catch (error) {
            return rejectWithValue(error);
        }
    });
}

export class AuthPublicThunk {
    static loginThunk = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
        try {
            const response = await AuthPublicService.login(formData.email, formData.password);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    });
    static oauth2AuthorisingThunk = createAsyncThunk('auth/oauth2-authorising', async (formData, { rejectWithValue }) => {
        try {
            const response = await Oauth2PublicService.oauth2Authorization(formData.code, formData.loginType);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    });
    static oauth2RegisterUserThunk = createAsyncThunk('auth/oauth2-register', async (formData, { rejectWithValue }) => {
        try {
            console.log(formData);
            const response = await Oauth2PublicService.oauth2RegisterUser(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    });
    static registerThunk = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
        try {
            const response = await AuthPublicService.register(formData.username, formData.password);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    });
}
