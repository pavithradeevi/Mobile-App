import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {LocalNotification} from './localNotification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('@truckfcmToken');
  console.log(fcmToken, 'Old token............');
  if (!fcmToken) {
    console.log(fcmToken, 'Old token-----');
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'New token');
        await AsyncStorage.setItem('@truckfcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'fcmToken error');
    }
  }
};

export const notificationListener = async () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Recived in background', remoteMessage);
  });
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
  });



  // const res = messaging().onMessage(async remoteMessage => {
  //   console.log('Recived in foreground', remoteMessage);
  //   LocalNotification({
  //     message: 'hai',
  //     title: 'hello',
  //   });
  // });
  // console.log(res, 'res');
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
