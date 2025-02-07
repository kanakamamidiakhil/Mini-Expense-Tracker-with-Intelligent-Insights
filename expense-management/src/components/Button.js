// src/components/Button.js
import React from 'react';

const Button = ({ children, onClick, style, ...rest }) => {
  return (
    <button onClick={onClick} style={style} {...rest}>
      {children}
    </button>
  );
};

export default Button;
