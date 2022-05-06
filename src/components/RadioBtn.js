import React from 'react';

export const RadioBtn = ({ position, name, onChange, currentPosition }) => {
  return (
    <label>
      <input
        type='radio'
        value={position.name}
        name={name}
        checked={currentPosition === position.name}
        onChange={event => onChange(event)}
        className='radio-btn'
      />
      <span className='position-name'>{position.name}</span>
    </label>
  )
}