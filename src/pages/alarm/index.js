import React, { useState, useEffect } from 'react';
import { Switch, View, Modal, Text, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage'; 

const db = SQLite.openDatabase(
  { name: 'CrewportDatabase.db', location: 'default' },
  () => {},
  error => {
    console.error('Error opening database: ', error);
  }
);

const AlarmToggles = ({ isAlarmEnabled, onToggle }) => {
  const navigation = useNavigation();
  const [alarmEnabled, setAlarmEnabled] = useState(isAlarmEnabled);
  const [flightTime, setFlightTime] = useState(''); 
  const [flightNos, setFlightNos] = useState(''); 
  const [flightDate, setFlightDate] = useState(''); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setAlarmEnabled(isAlarmEnabled);
  }, [isAlarmEnabled]);

  useEffect(() => {
    PushNotification.configure({
      onNotification: (notification) => {
        if (notification.userInteraction) {
          if (notification.data && notification.data.screen) {
            const screenName = notification.data.screen;
            navigation.navigate(screenName);
          }
        }
      },
    });
  }, []);
  const fetchFlightTime = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT crewCode, crewDesig, flightDate, patternNo, flightNo, deptTime, arrTime, startFrom, endsAt,
        flightFrom, flightTo, restPeriod, aircraftType, patternStTime, patternEndTime, id, isVoilated, voilationReason,
        reptIn, reptOut, createdDate, modifiedDate FROM roster_details WHERE date(flightDate) = date('now')`,
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            const flightDateStr = rows.item(0).patternStTime;
            console.log("Flight Date:", flightDateStr);
            const flightno = rows.item(0).flightNo;
            const flightdate = rows.item(0).flightDate;
            const flightdates = flightdate.substring(0, 10).split('-').reverse().join('/');
            const flightTime = flightDateStr.substring(11, 16);  
            console.log("Flight Time:", flightTime);
  
            setFlightTime(flightTime);
            setFlightNos(flightno);
            setFlightDate(flightdates);
          }
        },
        (_, error) => {
          console.error('Error fetching flightTime: ', error);
        }
      );
    });
  };

  useEffect(() => {
    fetchFlightTime(); // Fetch the flightTime when the component mounts
  }, []);

  const handleToggle = () => {
    const newAlarmState = !alarmEnabled;
    setAlarmEnabled(newAlarmState);
  
    if (newAlarmState) {
      // Create a channel without a custom sound
      PushNotification.createChannel({
        channelId: 'YOUR_CHANNEL_ID',
        channelName: 'YOUR_CHANNEL_NAME',
        channelDescription: 'YOUR_CHANNEL_DESCRIPTION',
        importance: 4,
        vibrate: true,
      });
  
      let notificationMessage = `Today You have ${flightNos} at ${flightTime}!`;
  
      if (flightNos.startsWith('LEAVE')) {
        notificationMessage = `Today you have Leave on ${flightDate}!`;
      }
  
      const notificationOptions = {
        channelId: 'YOUR_CHANNEL_ID',
        title: 'Alarm Enabled',
        message: notificationMessage,
        playSound: true,
        data: {
          screen: 'Home',
        },
      };
  
      PushNotification.localNotification(notificationOptions);
    }
  
    // Call the onToggle function if provided
    if (onToggle) {
      onToggle(newAlarmState);
    }
  };
  
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>{flightDate}{flightTime}</Text>
      <Switch value={alarmEnabled} onValueChange={handleToggle} />
    </View>
  );
};




export default AlarmToggles;
