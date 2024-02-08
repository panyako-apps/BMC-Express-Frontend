import React from 'react';
import './Spinner.css';

function Spinner({text}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="spin"></div>
      {text && (
        <div className="mt-6">
            {text}
        </div>
      )}
    </div>
  )
}

export default Spinner

