import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import PushNotification from 'react-native-push-notification';
import DateTimePicker from '@react-native-community/datetimepicker';

const db = SQLite.openDatabase(
  { name: 'CrewportDatabase.db', location: 'default' },
  () => {},
  (error) => {
    console.error('Error opening database: ', error);
  }
);

const AlarmUTC = ({ isAlarmEnabled, onToggle }) => {
  const [flightTime, setFlightTime] = useState('');
  const [flightNos, setFlightNos] = useState('');
  const [isToggleOn, setIsToggleOn] = useState(isAlarmEnabled);
  const [flightsdate, setFlightsdate] = useState('');
  const [isFutureTime, setIsFutureTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [notificationTriggered, setNotificationTriggered] = useState(false);
  const [selectedNotificationTime, setSelectedNotificationTime] = useState(null);


  const createChannels = () =>{
    PushNotification.createChannel(
      {
        channelId:'Crew-Port',
        channelName:'Crewport Channel'
      }
      )
      console.log('channel created utc Time')
  }

  useEffect(() => {
    fetchFlightTime();
    createChannels();

    // Schedule the notification when the component mounts
    if (isToggleOn && flightTime) {
      const [flightHours, flightMinutes] = flightTime.split(':').map(Number);

      let newHours = flightHours - 2;
      if (newHours < 0) {
        newHours += 24;
      }

      const newTime = `${newHours.toString().padStart(2, '0')}:${flightMinutes.toString().padStart(2, '0')}`;

      scheduleNotification(newTime, flightNos);
    }
  }, []);

  useEffect(() => {
    if (flightTime) {
      const [alarmHours, alarmMinutes] = flightTime.split(':').map(Number);
      const now = new Date();
      const alarmDate = new Date(flightsdate);
      alarmDate.setHours(alarmHours);
      alarmDate.setMinutes(alarmMinutes);
      alarmDate.setSeconds(0);

      setIsFutureTime(now < alarmDate);
    }
  }, [flightTime, flightsdate]);

  const fetchFlightTime = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT crewCode, crewDesig, flightDate, patternNo, flightNo, deptTime, arrTime, startFrom, endsAt,
        flightFrom, flightTo, restPeriod, aircraftType, patternStTime, patternEndTime, id, isVoilated, voilationReason,
        reptIn, reptOut, createdDate, modifiedDate FROM roster_details WHERE date(flightDate) = date('now')`,
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            const flightDateStr = rows.item(0).patternStTime;
            const flightdate = rows.item(0).flightDate;
            const flightno = rows.item(0).flightNo;
            const flightTime = flightDateStr.substring(11, 16);

            const [hours, minutes] = flightTime.split(':');
            const hoursInt = parseInt(hours, 10);
            const minutesInt = parseInt(minutes, 10);

            let newHours = hoursInt - 8;
            let flightDate = new Date(flightdate);

            if (newHours < 0) {
              newHours += 24;
              flightDate.setDate(flightDate.getDate() - 1);
            }

            const formattedFlightTime = `${newHours.toString().padStart(2, '0')}:${minutesInt.toString().padStart(2, '0')}`;
            const formattedFlightDate = `${(flightDate.getMonth() + 1).toString().padStart(2, '0')}-${flightDate.getDate().toString().padStart(2, '0')}`;

            setFlightTime(formattedFlightTime);
            setFlightNos(flightno);
            setFlightsdate(formattedFlightDate);
          }
        },
        (_, error) => {
          console.error('Error fetching flightTime: ', error);
        }
      );
    });
  };

  const handleTimeSelection = () => {
    setShowTimePicker(true);
  };

  const handleTimePickerChange = (event, selected) => {
    if (event.type === 'set' && selected) {
      setSelectedNotificationTime(new Date(selected));
    }
    setShowTimePicker(false);
  };

  const scheduleNotification = (time) => {
    try {
      const now = new Date();
      const selectedHours = time.getHours();
      const selectedMinutes = time.getMinutes();

      const notificationDate = new Date();
      notificationDate.setHours(selectedHours);
      notificationDate.setMinutes(selectedMinutes);
      notificationDate.setSeconds(0);

      if (now < notificationDate) {
        console.log('Scheduling notification for', notificationDate);

        PushNotification.localNotificationSchedule({
          channelId: 'check-in-reminders',
          message: `Today You have a ${flightNos} at ${selectedHours}:${selectedMinutes}`,
          date: notificationDate,
          onNotification: () => {
            console.log('Notification clicked');
            setNotificationTriggered(true);
          },
        });
      } else {
        console.log('Notification not triggered. The time is in the past.');
      }
    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
  };

  useEffect(() => {
    if (selectedNotificationTime) {
      scheduleNotification(selectedNotificationTime);
    }
  }, [selectedNotificationTime]);

  const handleToggleChange = (value) => {
    setIsToggleOn(value);

    if (value) {
      if (flightTime) {
        const [flightHours, flightMinutes] = flightTime.split(':').map(Number);

        let newHours = flightHours - 2;
        if (newHours < 0) {
          newHours += 24;
        }

        const newTime = `${newHours.toString().padStart(2, '0')}:${flightMinutes.toString().padStart(2, '0')}`;

        scheduleNotification(newTime, flightNos);
      } else {
        console.error('Flight time is undefined or empty.');
      }
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Text style={[styles.flightText, isFutureTime ? styles.boldText : styles.normalText]}>
        Flight Time: {flightTime}
      </Text>

      {selectedNotificationTime && (
        <Text style={styles.notificationText}>
          Selected Notification Time: {selectedNotificationTime.getHours()}:
          {selectedNotificationTime.getMinutes()}
        </Text>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          value={isToggleOn}
          onValueChange={(value) => {
            if (notificationTriggered) {
              setIsToggleOn(false);
            } else {
              handleToggleChange(value);
            }
          }}
        />

        <TouchableOpacity onPress={handleTimeSelection}>
          <Text>Select Time</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
            onChange={handleTimePickerChange}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flightText: {
    // Your common text styles here
  },
  boldText: {
    fontWeight: 'bold',
  },
  normalText: {
    fontWeight: 'normal',
  },
});

export default AlarmUTC;
