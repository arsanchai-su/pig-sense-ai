import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';

interface WaterSpringProps {
  name: string;
  temperature: number;
  humidity: number;
}

const WaterSpring: React.FC<WaterSpringProps> = ({ name, temperature, humidity }) => {
  const [isAuto, setIsAuto] = useState<boolean>(true);
  const [isInsideOn, setIsInsideOn] = useState<boolean>(false);
  const [isOutsideOn, setIsOutsideOn] = useState<boolean>(false);

  useEffect(() => {
    if (isAuto) {
      // Inside Water Spring Logic
      if (humidity < 40) {
        setIsInsideOn(true);
      } else if (humidity > 75) {
        setIsInsideOn(false);
      }

      // Outside Water Spring Logic
      if (temperature > 30) {
        setIsOutsideOn(true);
      } else {
        setIsOutsideOn(false);
      }
    }
  }, [temperature, humidity, isAuto]);

  const handleToggleAuto = () => {
    setIsAuto(!isAuto);
  };

  const handleToggleInsideOnOff = () => {
    if (!isAuto) {
      setIsInsideOn(!isInsideOn);
    }
  };

  const handleToggleOutsideOnOff = () => {
    if (!isAuto) {
      setIsOutsideOn(!isOutsideOn);
    }
  };

  return (
    <div style={{ padding: '10px', border: '2px solid black', borderRadius: '5px', display: 'inline-block' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3>{name}</h3>
      </div>
      <Switch checked={isAuto} onChange={handleToggleAuto} />
      <label>{isAuto ? 'Auto' : 'Manual'}</label>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: 0 }}>ภายในโรงเรือน :</h4>
          <div style={{ 
            backgroundColor: isInsideOn ? 'green' : 'orange', 
            color: 'white',
            width: '60px', 
            height: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '5px',
            marginLeft: '10px' 
          }}>
            {isInsideOn ? 'ทำงาน' : 'หยุด'}
          </div>
        </div>
        <Button
          variant="contained"
          onClick={handleToggleInsideOnOff}
          style={{ 
            backgroundColor: isInsideOn ? 'red' : 'green', 
            color: 'white', 
            marginBottom: '5px' 
          }}
          disabled={isAuto} // Disable button in auto mode
        >
          {isInsideOn ? 'Turn Off' : 'Turn On'}
        </Button>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: 0 }}>บนหลังคา : </h4>
          <div style={{ 
            backgroundColor: isOutsideOn ? 'green' : 'orange', 
            color: 'white',
            width: '60px', 
            height: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '5px',
            marginLeft: '10px' 
          }}>
            {isOutsideOn ?'ทำงาน' : 'หยุด'}
          </div>
        </div>
        <Button
          variant="contained"
          onClick={handleToggleOutsideOnOff}
          style={{ 
            backgroundColor: isOutsideOn ? 'red' : 'green', 
            color: 'white', 
            marginBottom: '5px' 
          }}
          disabled={isAuto} // Disable button in auto mode
        >
          {isOutsideOn ? 'Turn Off' : 'Turn On'}
        </Button>
      </div>
    </div>
  );
};

export default WaterSpring;
