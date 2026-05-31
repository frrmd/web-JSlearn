import React from 'react';

export default function PasswordStrengthIndicator({ password }) {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  if (!password) {
    return null;
  }

  return (
    <div className="mt-3 p-4 bg-surface-container-highest/30 rounded-xl border-2 border-[#b2bf85]/20">
      <p className="text-xs font-bold text-[#313c0f] mb-2">Password must contain:</p>
      <ul className="space-y-1">
        {requirements.map((req, index) => (
          <li
            key={index}
            className={`text-xs flex items-center gap-2 font-medium transition-colors duration-300 ${
              req.met ? 'text-[#2e7300]' : 'text-on-surface-variant/60'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[14px] ${
                req.met ? 'opacity-100' : 'opacity-40'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {req.met ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
