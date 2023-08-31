


import React, { useContext, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { Block, PageHeader, Text } from '../../components';
import { AppContext } from '../../appContext';
import ToggleSwitch from '../home/switchMode';
import PushNotification from 'react-native-push-notification';
import AlarmToggles from '../alarm';
import Alarm from '../alarm/notify/alarm';




const SettingScrn = ({selectedLocation,onModeChange}) => {
  const { showMst, toggleTimezone } = useContext(AppContext);
  const [alarmToggleText, setAlarmToggleText] = useState('OFF'); 

  const handleToggleTextChange = (newText) => {
    setAlarmToggleText(newText);
  };

  
 

  const handleToggle = () => {
    toggleTimezone();
  };

  return (
    <Block light container padding>
      <PageHeader borderRadius center>
        <Text h5>Settings</Text>
      </PageHeader>
      <Text />
      <View style={styles.toggleContainer}>
        <Text style={styles.boldText}>Select TimeZone:</Text>
        <Text style={styles.normalText}>{showMst ? 'MST' : 'UTC'}</Text>
        
        <ToggleSwitch/>
        </View>
        <View style={styles.toggleContainer}>
        <Text style={styles.boldText}>Automatic Alarm:</Text>
        <AlarmToggles/>
        </View>
        <Alarm/>
       
        
    </Block>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  boldText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: 15,
  },
});

export default SettingScrn;




