import PushNotification from 'react-native-push-notification';

// Create a function to initialize the notification channel
const initializeNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'your-channel-id',
      channelName: 'Your Channel Name',
      channelDescription: 'Your Channel Description',
      playSound: true,
      soundName: 'my_sound.mp3',
      importance: 4,
    },
    (created) => console.log(`Notification channel created: ${created}`)
  );
};

// Create a function to send a notification
const sendPushNotification = () => {
  PushNotification.localNotification({
    /* other options */
    channelId: 'your-channel-id',
    title: 'Notification Title',
    message: 'This is your notification message',
    soundName: 'my_sound.mp3',
    playSound: true,
  });
};

export { initializeNotificationChannel, sendPushNotification };
