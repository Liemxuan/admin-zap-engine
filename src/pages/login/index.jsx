import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, Zap, ArrowRight, Check } from 'lucide-react';
import useAppStore from '../../stores/useAppStore';
import { loginService } from '../../services/login.service';
import '../../styles/login/login.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const setUser = useAppStore(state => state.setUser);

    const [formData, setFormData] = useState({
        MerchantName: '',
        UserName: '',
        Password: '',
        IsRemember: true
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const merchantRef = useRef(null);
    const userRef = useRef(null);
    const passwordRef = useRef(null);

    // Load saved credentials on mount
    useEffect(() => {
        const saved = localStorage.getItem('remembered_user');
        if (saved) {
            try {
                const { MerchantName, UserName, Password } = JSON.parse(saved);
                setFormData(prev => ({
                    ...prev,
                    MerchantName: MerchantName || '',
                    UserName: UserName || '',
                    Password: Password || '',
                    IsRemember: true
                }));
            } catch (e) {
                console.error('Failed to parse remembered user', e);
            }
        }
        merchantRef.current?.focus();
    }, []);

    const handleMerchantChange = (e) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        setFormData(prev => ({ ...prev, MerchantName: value }));
        if (errors.MerchantName) setErrors(prev => ({ ...prev, MerchantName: '' }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        if (apiError) setApiError('');
    };

    const validate = () => {
        const newErrors = {};
        let firstRef = null;

        if (!formData.MerchantName) {
            newErrors.MerchantName = 'Merchant Name is required';
            firstRef = merchantRef;
        } else if (!formData.UserName) {
            newErrors.UserName = 'Email Address is required';
            firstRef = firstRef || userRef;
        } else if (!formData.Password) {
            newErrors.Password = 'Password is required';
            firstRef = firstRef || passwordRef;
        }

        setErrors(newErrors);
        if (firstRef?.current) firstRef.current.focus();
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        setApiError('');

        try {
            const response = await loginService.loginV4(formData);

            // Extract token and user info based on the provided JSON structure
            // Using || ensures compatibility if the API wraps the response in a 'Data' property
            const token = response.AccessToken || response.Data?.AccessToken;
            const userData = {
                MerchantName: response.MerchantName,
                FullName: response.FullName,
                UserGuid: response.UserGuid,
                Avatar: response.Avatar,
                Role: response.Role,
                // Spread the rest of the response to capture any extra metadata
                ...response
            };

            if (token) {
                localStorage.setItem('token', token);

                // Handle Remember Me logic
                if (formData.IsRemember) {
                    localStorage.setItem('remembered_user', JSON.stringify({
                        MerchantName: formData.MerchantName,
                        UserName: formData.UserName,
                        Password: formData.Password
                    }));
                } else {
                    localStorage.removeItem('remembered_user');
                }

                setUser(userData);
                navigate('/dashboard');
            } else {
                setApiError('Invalid response from server');
            }
        } catch (error) {
            setApiError(error.message);
            passwordRef.current?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card animate-fade-in">
                <div className="text-center">
                    <div className="logo-box">
                        <Zap size={36} fill="white" stroke="white" />
                    </div>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to your account</p>
                </div>

                {apiError && (
                    <div className="error-alert">
                        <div className="error-alert-icon">
                            <AlertCircle size={18} />
                        </div>
                        <span className="error-alert-message">{apiError}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} noValidate>
                    {/* Merchant Name */}
                    <div className="input-container">
                        <label className="form-label">Merchant Name</label>
                        <div className="relative">
                            <Building2 className="input-icon" size={20} />
                            <input
                                ref={merchantRef}
                                type="text"
                                name="MerchantName"
                                value={formData.MerchantName}
                                onChange={handleMerchantChange}
                                className={`form-input ${errors.MerchantName ? 'has-error' : ''}`}
                                placeholder="e.g. pho24"
                            />
                        </div>
                        {errors.MerchantName && <p className="text-xs text-red-500 mt-2 font-bold ml-1">{errors.MerchantName}</p>}
                    </div>

                    {/* Email */}
                    <div className="input-container">
                        <label className="form-label">Email Address</label>
                        <div className="relative">
                            <Mail className="input-icon" size={20} />
                            <input
                                ref={userRef}
                                type="text"
                                name="UserName"
                                value={formData.UserName}
                                onChange={handleChange}
                                className={`form-input ${errors.UserName ? 'has-error' : ''}`}
                                placeholder="admin@pho24.vn"
                            />
                        </div>
                        {errors.UserName && <p className="text-xs text-red-500 mt-2 font-bold ml-1">{errors.UserName}</p>}
                    </div>

                    {/* Password */}
                    <div className="input-container">
                        <label className="form-label">Password</label>
                        <div className="relative">
                            <Lock className="input-icon" size={20} />
                            <input
                                ref={passwordRef}
                                type={showPassword ? 'text' : 'password'}
                                name="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                className={`form-input ${errors.Password ? 'has-error' : ''}`}
                                placeholder="••••••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.Password && <p className="text-xs text-red-500 mt-2 font-bold ml-1">{errors.Password}</p>}
                    </div>

                    <label className="remember-me">
                        <input
                            type="checkbox"
                            checked={formData.IsRemember}
                            onChange={(e) => setFormData(prev => ({ ...prev, IsRemember: e.target.checked }))}
                        />
                        <div className="checkbox-custom">
                            <Check className="checkbox-icon" size={14} strokeWidth={4} />
                        </div>
                        <span className="remember-label">Remember me</span>
                    </label>

                    <div className="mt-10">

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={22} />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="login-footer">
                    <span>First time here?</span>
                    <span onClick={() => { }}>Contact Administrator</span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
