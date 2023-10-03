// InitializeNotifications.js
import PushNotification from 'react-native-push-notification';

export const initializeNotifications = () => {
  PushNotification.createChannel(
    {
      channelId: 'check-in-reminders',
      channelName: 'Check-In Reminders Channel',
      channelDescription: 'Channel for check-in reminders',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`Notification channel created: ${created}`)
  );
};
