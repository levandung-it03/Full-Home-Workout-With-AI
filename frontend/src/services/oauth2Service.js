import Cookies from 'js-cookie';
import { springService } from './apiService';

const API_PUBLIC_PREFIX = process.env.REACT_APP_API_PUBLIC_PREFIX;

export class Oauth2PublicService {
    static async oauth2Login(loginType) {
        try {
            const response = await springService.get(`${API_PUBLIC_PREFIX}/auth/v1/oauth2-authentication-url`, {
                params: { loginType },
            });
            console.log(response.data)
            window.location.href = response.data.data;
        } catch (error) {
            console.error(error);
            throw error.response ? error.response.data : error;
        }
    };

    static async oauth2Authorization(code, loginType) {
        try {
            const response = await springService.post(`${API_PUBLIC_PREFIX}/auth/v1/oauth2-authorization`, { code, loginType });
            if ("" + response.data.data["isExistingUserInfo"] === "true") {
                const { accessToken, refreshToken } = response.data.data;
                Cookies.set('accessToken', accessToken, {
                    path: '/',
                    secure: true,
                    sameSite: 'Strict',
                });
                Cookies.set('refreshToken', refreshToken, {
                    path: '/',
                    secure: true,
                    sameSite: 'Strict',
                });
            }
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : error;
        }
    }

    static async oauth2RegisterUser(form) {
        try {
            const response = await springService.post(`${API_PUBLIC_PREFIX}/auth/v1/oauth2-register-user`, form);
            const { accessToken, refreshToken } = response.data.data;
            Cookies.set('accessToken', accessToken, {
                path: '/',
                secure: true,
                sameSite: 'Strict',
            });
            Cookies.set('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: 'Strict',
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response;
        }
    }

    static async getAllOauth2DefaultPasswords() {
        try {
            const response = await springService.get(`${API_PUBLIC_PREFIX}/user/v1/get-all-default-passwords`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error.response ? error.response.data : error;
        }
    }
}
