import { springService } from "./apiService";

const API_USER_PREFIX = process.env.REACT_APP_API_USER_PREFIX;

export class SePayUserService {
    static async getQRBankingUrlToDepositCoins(coinsAmount) {
        try {
            const response = await springService.get(`${API_USER_PREFIX}/v1/get-sepay-qr-url`, {
                params: { coinsAmount }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response ? error.response : error;
        }
    };
    
    static async getDepositStatus(description) {
        try {
            const response = await springService.get(`${API_USER_PREFIX}/v1/get-deposit-status`, {
                params: { description }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response ? error.response : error;
        }
    };
}