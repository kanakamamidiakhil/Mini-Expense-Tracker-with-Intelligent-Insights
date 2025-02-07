// src/components/InputField.js
import React from 'react';

const InputField = ({ label, type, value, onChange, ...rest }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
        style={{ width: '100%', padding: '8px', marginTop: '4px' }}
      />
    </div>
  );
};

export default InputField;
