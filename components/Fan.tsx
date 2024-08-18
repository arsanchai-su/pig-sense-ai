import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';

interface FanProps {
  name: string;
  temperature: number;
  humidity: number;
}

const Fan: React.FC<FanProps> = ({ name, temperature, humidity }) => {
  const [isAuto, setIsAuto] = useState<boolean>(true);
  const [isOn, setIsOn] = useState<boolean>(false);

  useEffect(() => {
    if (isAuto) {
      if (temperature > 33 || humidity > 80) {
        setIsOn(true);
      } else {
        setIsOn(false);
      }
    }
  }, [temperature, humidity, isAuto]);

  const handleToggleAuto = () => {
    setIsAuto(!isAuto);
  };

  const handleToggleOnOff = () => {
    if (!isAuto) {
      setIsOn(!isOn);
    }
  };

  return (
    <div style={{ border: '2px solid black', padding: '10px', borderRadius: '5px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3>{name} : </h3>
        <div style={{ 
          backgroundColor: isOn ? 'green' : 'orange', 
          color: 'white',
          width: '40px', 
          height: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginLeft: '10px'  // Adds some space between the name and the status
        }}>
          {isOn ? 'ทำงาน' : 'หยุด'}
        </div>
      </div>
      <div>
        <Switch checked={isAuto} onChange={handleToggleAuto} />
        <label>{isAuto ? 'Auto' : 'Manual'}</label>
      </div>
      <Button 
        variant="contained" 
        onClick={handleToggleOnOff} 
        disabled={isAuto}  // Disable the button when in Auto mode
        style={{ 
          marginTop: '10px', 
          backgroundColor: isOn ? 'red' : 'green',  // Red for 'Turn Off', Green for 'Turn On'
          color: 'white'
        }} 
      >
        {isOn ? 'Turn Off' : 'Turn On'}
      </Button>
    </div>
  );
};

export default Fan;
