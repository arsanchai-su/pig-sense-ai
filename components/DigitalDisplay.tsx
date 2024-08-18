import React from 'react';

interface DigitalDisplayProps {
  label: string;
  value: number;
  min: number;
  max: number;
  warningValue?: number;
}

const DigitalDisplay: React.FC<DigitalDisplayProps> = ({ label, value, min, max, warningValue }) => {
  const getColor = () => {
    if (warningValue && value > warningValue) {
      return '#ffa500'; // Orange color for warning
    }
    return '#00ff00'; // Green color
  };

  const displayValue = value.toFixed(2);

  return (
    <div style={{ width: '200px', margin: '10px', textAlign: 'center' }}>
      <h4>{label}</h4>
      <div
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: getColor(),
          fontFamily: 'Digital-7, monospace', // Digital clock-like font
          backgroundColor: '#000', // Background color for better visibility
          padding: '10px',
          borderRadius: '10px',
          display: 'inline-block',
          minWidth: '160px'
        }}
      >
        {displayValue}
      </div>
      {/* <div style={{ marginTop: '10px', fontSize: '14px' }}>
        {displayValue} / {max}
      </div> */}
    </div>
  );
};

export default DigitalDisplay;
