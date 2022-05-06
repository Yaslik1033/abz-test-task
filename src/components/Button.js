import React from 'react';

export const Button = ({ text, type, disabled, clickHandler }) => {
  return (
    <button
      className="btn"
      type={type}
      disabled={disabled}
      onClick={clickHandler}
    >
      {text}
    </button>
  )
}