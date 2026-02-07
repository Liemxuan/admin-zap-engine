import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, Zap, ArrowRight } from 'lucide-react';
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

    useEffect(() => {
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
            const token = response.Data?.AccessToken || response.token;
            const userData = response.Data?.UserInfo || response.user || { name: formData.UserName };

            if (token) {
                localStorage.setItem('token', token);
                setUser(userData);
                navigate('/');
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
                    <div className="bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl flex items-center gap-4 mb-8 text-sm font-semibold animate-fade-in">
                        <AlertCircle size={22} className="flex-shrink-0" />
                        <span>{apiError}</span>
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
