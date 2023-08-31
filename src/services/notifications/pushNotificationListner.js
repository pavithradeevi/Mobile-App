import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {
  createNotificationChannel,
  LocalNotification,
} from './localNotification';
import {useNavigation} from '@react-navigation/native';

const PushNotificationListner = () => {
  const [routeName, setrouteName] = useState();
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      logFun('Authorization status:', authStatus);
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('@truckfcmToken');
    logFun('Old token', fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          logFun('New token', fcmToken);
          await AsyncStorage.setItem('@truckfcmToken', fcmToken);
        }
      } catch (error) {
        logFun('fcmToken error', error);
      }
    }
  };
  const logFun = (msg, data) => {
    console.log(data && JSON.stringify(data, null, 2), msg);
  };

  useEffect(() => {
    logFun('running PushNotificationListner');
    createNotificationChannel();
    requestUserPermission();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      logFun('Recived in background', remoteMessage);
      const {data} = remoteMessage;
      setrouteName(data.route);
    });
    messaging().onNotificationOpenedApp(async remoteMessage => {
      logFun(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      logFun('Recived in foreground', remoteMessage);
      const {
        notification: {body, title},
      } = remoteMessage;
      LocalNotification({
        message: body,
        title: title,
      });
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const {data} = remoteMessage;
          setrouteName(data.route);
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    return () => {
      logFun('cleaning PushNotificationListner');
      unsubscribe();
    };
  }, []);

  return routeName;
};

export default PushNotificationListner;
