import React from 'react';

export const Input = ({ name, type, placeholder, onChange, value, blur }) => {
  return (
    // input wrapper is added for dispalying pseudoelements after/before
    <div className='input-wrap' data-name={name}>
      <input
        className='input'
        type={type}
        placeholder={placeholder}
        onChange={event => onChange(event)}
        name={name}
        value={value}
        onBlur={blur}
      />
    </div>
  )
}