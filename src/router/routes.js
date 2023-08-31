import react, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import StackRoute from './stackRoutes';
import {
  createNotificationChannel,
  LocalNotification,
} from '../services/notifications/localNotification';
import {AddNotificationAction} from '../redux/slices/notificationSlice';

const Routes = props => {
  const Dispatch = useDispatch();
  const {notify} = useSelector(_state => _state);
  const [isSignedIn, setisSignedIn] = useState(false);
  const [notificationDetails, setnotificationDetails] = useState();

  console.log(notify, 'notify');
  const checkUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      const present = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('running');
      setisSignedIn(jsonValue != null);
    } catch (e) {
      setisSignedIn(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

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
        console.log(fcmToken, 'fcmToken response');
        if (fcmToken) {
          await AsyncStorage.setItem('@truckfcmToken', fcmToken);
          logFun('New token', fcmToken);
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

    messaging().onNotificationOpenedApp(async remoteMessage => {
      logFun(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      const {data} = remoteMessage;
      const _data = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      };

      Dispatch(AddNotificationAction(_data));

      setnotificationDetails({
        route: data.route,
        data: {},
      });
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      logFun('Recived in foreground', remoteMessage);
      const {data} = remoteMessage;
      const _data = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      };

      Dispatch(AddNotificationAction(_data));

      LocalNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
      });
      // setnotificationDetails({
      //   route: data.route,
      //   data: {bookingId: data.bookingId},
      // });
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const {data} = remoteMessage;
          const _data = {
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
          };

          Dispatch(AddNotificationAction(_data));

          setnotificationDetails({
            route: data.route,
            data: {bookingId: data.bookingId},
          });
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      logFun('Recived in background', remoteMessage);
      const {data} = remoteMessage;
      const _data = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      };

      Dispatch(AddNotificationAction(_data));
      setnotificationDetails({
        route: data.route,
        data: {bookingId: data.bookingId},
      });
    });
    return () => {
      logFun('cleaning PushNotificationListner');
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <StackRoute {...props} />
    </NavigationContainer>
  );
};

export default Routes;
