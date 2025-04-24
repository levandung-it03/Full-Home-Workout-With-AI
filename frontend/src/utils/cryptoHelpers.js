import CryptoJS from "crypto-js";

const SECRET_KEY = CryptoJS.enc.Base64.parse(process.env.REACT_APP_AES_CRYPTO_KEY);
const IV = CryptoJS.enc.Utf8.parse('\0'.repeat(16)); // Zero IV

export class CryptoHelper {
    static encrypt(raw) {
        const encrypted = CryptoJS.AES.encrypt(raw, SECRET_KEY, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        console.log(encrypted.toString());
        return encrypted.toString(); // Base64
    }

    static decrypt(encrypted) {
        const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}