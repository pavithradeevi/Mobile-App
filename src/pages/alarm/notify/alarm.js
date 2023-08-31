import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import PushNotification from 'react-native-push-notification';

function Alarm() {
  const [isAlarmOn, setIsAlarmOn] = useState(false);

  useEffect(() => {
    // Configure notification settings (this can be done in another setup file)
    PushNotification.configure({
      // Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('Notification received:', notification);
      },
      // Android-specific configuration
      android: {
        channelId: 'channel-id', // Change this to your desired channel ID
        smallIcon: 'icon_name', // Change this to your desired icon
        largeIcon: 'icon_name', // Change this to your desired large icon
      },
    });

    return () => {
      // Release any resources or perform cleanup when the component unmounts
    };
  }, []);

  const toggleAlarm = () => {
    if (isAlarmOn) {
      // Turn off the alarm
      setIsAlarmOn(false);
      PushNotification.cancelAllLocalNotifications();
    } else {
      // Turn on the alarm and schedule it for 5 seconds from now
      const now = new Date();
      const alarmTime = new Date(now.getTime() + 5000); // Set alarm for 5 seconds from now

      PushNotification.localNotificationSchedule({
        title: 'Alarm',
        message: 'Time to wake up!',
        date: alarmTime,
      });

      setIsAlarmOn(true);
    }
  };

  return (
    <View>
      <Button onPress={toggleAlarm} title={isAlarmOn ? 'Turn Off Alarm' : 'Turn On Alarm'} />
      <Text>{isAlarmOn ? 'Alarm is On' : 'Alarm is Off'}</Text>
    </View>
  );
}

export default Alarm;
