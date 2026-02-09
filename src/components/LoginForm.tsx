import React, { useState } from 'react';
import { ThemeState } from '../types';
import { StandardInput } from './atoms/StandardInput';
import { Button } from './atoms/Button';
import { Checkbox } from './atoms/Checkbox';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Building2, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  themeState: ThemeState;
  onSubmit: (merchantName: string, email: string, password: string, rememberMe: boolean) => void;
  onSignUpClick?: () => void;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  themeState,
  onSubmit,
  onSignUpClick,
  isLoading = false,
  error
}) => {
  const [merchantName, setMerchantName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [merchantError, setMerchantError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!merchantName) {
      setMerchantError('Merchant name is required');
      hasError = true;
    } else {
      setMerchantError('');
    }

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!hasError) {
      onSubmit(merchantName, email, password, rememberMe);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-3 animate-fade-in shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <StandardInput
          themeState={themeState}
          label="Merchant Domain"
          value={merchantName}
          onChange={(e) => setMerchantName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
          icon={Building2}
          hasError={!!merchantError}
          errorText={merchantError}
          placeholder="e.g. zap-vn"
        />

        <StandardInput
          themeState={themeState}
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          hasError={!!emailError}
          errorText={emailError}
          placeholder="name@company.com"
        />

        <div className="space-y-1">
          <StandardInput
            themeState={themeState}
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            rightIcon={showPassword ? EyeOff : Eye}
            onRightIconClick={() => setShowPassword(!showPassword)}
            hasError={!!passwordError}
            errorText={passwordError}
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <Checkbox
            id="remember-me"
            label="Remember this device"
            checked={rememberMe}
            onChange={setRememberMe}
            themeState={themeState}
          />
          <button
            type="button"
            className="text-xs font-bold hover:underline transition-all"
            style={{ color: themeState.primary }}
            onClick={() => alert('Please contact your administrator to reset your password.')}
          >
            Forgot Password?
          </button>
        </div>

        <Button
          themeState={themeState}
          label={isLoading ? "Authenticating..." : "Sign In"}
          variant="primary"
          type="submit"
          disabled={isLoading}
          iconTrailing={isLoading ? undefined : ArrowRight}
          className="w-full py-5 text-base shadow-xl shadow-purple-500/10"
        />
      </form>

      <div className="mt-10 text-center bg-gray-50/50 backdrop-blur-sm rounded-[2rem] p-6 border border-gray-100">
        <p className="text-sm text-gray-500 font-medium">
          New to ZAP Enterprise?{' '}
          <button
            onClick={onSignUpClick}
            className="font-extrabold hover:underline ml-1"
            style={{ color: themeState.primary }}
          >
            Create Business Account
          </button>
        </p>
      </div>
    </div>
  );
};
