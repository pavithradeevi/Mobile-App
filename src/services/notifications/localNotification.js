import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

// PushNotification.configure({
//     onNotification: function (notification) {
//         console.log("NOTIFICATION:", notification);
//       },

// })
export const createNotificationChannel = () => {
  PushNotification.createChannel({
    channelId: 'Trucker Channel-id',
    channelName: 'Trucker app',
  });
};

export const LocalNotification = data => {
  PushNotification.localNotification({
    message: data.message,
    title: data.title,
    channelId: true,
  });
};
