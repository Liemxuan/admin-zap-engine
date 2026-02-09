import React from 'react';
import { Check } from 'lucide-react';
import { ThemeState } from '../../types';

interface CheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    themeState: ThemeState;
    className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    id,
    label,
    checked,
    onChange,
    themeState,
    className = ''
}) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only"
                />
                <div
                    onClick={() => onChange(!checked)}
                    className={`w-5 h-5 rounded-md border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${checked
                            ? 'shadow-sm'
                            : 'bg-white border-gray-300 hover:border-gray-400'
                        }`}
                    style={{
                        backgroundColor: checked ? themeState.primary : 'transparent',
                        borderColor: checked ? themeState.primary : undefined,
                    }}
                >
                    {checked && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
            </div>
            <label
                htmlFor={id}
                className="text-sm font-medium text-gray-600 cursor-pointer select-none"
                style={{ fontFamily: themeState.fontFamily }}
            >
                {label}
            </label>
        </div>
    );
};
