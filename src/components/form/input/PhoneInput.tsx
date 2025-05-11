import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './PhoneInput.css';
import Label from '../Label';

interface PhoneInputProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  hint?: string;
  className?: string;
  onValidationChange?: (isValid: boolean) => void;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({
  value = '',
  onChange,
  label = 'Phone Number',
  placeholder = 'Enter phone number',
  required = false,
  error = false,
  hint,
  className = '',
  onValidationChange,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [validationMessage, setValidationMessage] = useState<string>('');

  useEffect(() => {
    if (value) {
      const valid = isValidPhoneNumber(value);
      setIsValid(valid);
      setValidationMessage(valid ? '' : 'Please enter a valid phone number for the selected country');
      onValidationChange?.(valid);
    } else {
      setIsValid(true);
      setValidationMessage('');
      onValidationChange?.(true);
    }
  }, [value, onValidationChange]);

  const handleChange = (newValue: string | undefined) => {
    onChange(newValue);
  };

  return (
    <div>
      {label && (
        <Label htmlFor="phone">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <PhoneInput
          international
          countryCallingCodeEditable={true}
          defaultCountry="MZ"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`PhoneInputInput ${(!isValid || error) ? 'error' : ''} ${className}`}
        />
      </div>
      {(hint || !isValid) && (
        <p className={`mt-1.5 text-xs ${(!isValid || error) ? 'text-error-500' : 'text-gray-500'}`}>
          {!isValid ? validationMessage : hint}
        </p>
      )}
    </div>
  );
};

export default CustomPhoneInput; 