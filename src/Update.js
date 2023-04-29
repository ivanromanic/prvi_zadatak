import React from 'react';

const MyDiv = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '400px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button style={{ marginRight: '10px' }}>Left Button</button>
        <label>
          <input type="checkbox" style={{ marginRight: '5px' }} />
          Checkbox
        </label>
      </div>
      <button>Right Button</button>
    </div>
  );
}

export default MyDiv;