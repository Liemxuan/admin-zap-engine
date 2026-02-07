import httpClient from './httpClient';

export const loginService = {
    /**
     * Performs Login V4 authentication
     * @param {Object} payload 
     * @param {string} payload.MerchantName
     * @param {string} payload.UserName
     * @param {string} payload.Password
     * @param {boolean} [payload.IsRemember]
     */
    loginV4: async (payload) => {
        const endpoint = import.meta.env.VITE_API_LOGIN_V4 || '/api/v1/authentication/loginV4';
        return await httpClient.post(endpoint, payload);
    }
};
