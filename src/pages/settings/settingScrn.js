import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Block, PageHeader, Text } from '../../components';
import { AppContext } from '../../appContext';
import ToggleSwitch from '../home/switchMode';
import AlarmToggles from '../alarm';
import AlarmUTC from '../alarm/alarmutc';



const SettingScrn = () => {
  const { showMst, toggleTimezone } = useContext(AppContext);
  const [selectedTimezone, setSelectedTimezone] = useState('MST'); // Default to MST

  const handleToggle = () => {
    toggleTimezone();
    setSelectedTimezone(showMst ? 'MST' : 'UTC');
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
        <ToggleSwitch onToggle={handleToggle} />
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.boldText}>Alarm:</Text>
        {showMst  ? <AlarmToggles /> : <AlarmUTC />}
      </View>
     
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
