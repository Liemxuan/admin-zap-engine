import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../stores/useAppStore';
import { useStore } from '../../store';
import { loginService } from '../../services/login.service';
import LoginScreen from '../../components/LoginScreen';
import { STORAGE_KEYS } from '../../utils/const';

const LoginPage = () => {
    const navigate = useNavigate();
    const setUser = useAppStore(state => state.setUser);
    const computedTheme = useStore(state => state.computedTheme);

    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (merchant, username, password, remember) => {
        setIsLoading(true);
        setApiError('');

        try {
            const formData = {
                MerchantName: merchant,
                UserName: username,
                Password: password,
                IsRemember: remember
            };

            const response = await loginService.loginV4(formData);
            const token = response.Data?.AccessToken || response.AccessToken || response.token;

            let userData = response.Data?.UserInfo || response.user;
            if (!userData && response.UserGuid) {
                userData = {
                    MerchantName: response.MerchantName,
                    FullName: response.FullName,
                    UserGuid: response.UserGuid,
                    Avatar: response.Avatar,
                    Role: response.Role,
                    ...response
                };
            }
            if (!userData) userData = { name: username };

            if (token) {
                localStorage.setItem(STORAGE_KEYS.TOKEN, token);

                if (remember) {
                    localStorage.setItem(STORAGE_KEYS.REMEMBERED_USER, JSON.stringify(formData));
                } else {
                    localStorage.removeItem(STORAGE_KEYS.REMEMBERED_USER);
                }

                setUser(userData);
                navigate('/dashboard');
            } else {
                setApiError('Invalid response from server');
            }
        } catch (error) {
            setApiError(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginScreen
            onLogin={handleLogin}
            themeState={computedTheme}
            error={apiError}
            isLoading={isLoading}
        />
    );
};

export default LoginPage;
