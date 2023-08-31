import React, { useContext, useState } from 'react';
import { Switch, View } from 'react-native';
import { AppContext } from '../../appContext';

const ToggleSwitch = () => {
  const { showMst, toggleTimezone } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(true); 

  const handleToggle = () => {
    toggleTimezone();
  };

  
  return isVisible ? (
    <View>
      <Switch value={showMst} onValueChange={handleToggle} />
    </View>
  ) : null;
};

export default ToggleSwitch;
