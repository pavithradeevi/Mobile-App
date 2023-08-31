import { Alert, BackHandler, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const requestAndroidLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cargoflo app needs to access location',
        message: 'Cargoflo app needs to access location',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const requestIosLocationPermission = async () => {
  const userResponse = await Geolocation.requestAuthorization('whenInUse');
  return userResponse === 'granted';
};

export const getLocationPermission = async () => {
  let isLocEnabled = false;
  if (Platform.OS === 'android') {
    console.log(Platform.OS);
    isLocEnabled = await requestAndroidLocationPermission();
  } else if (Platform.OS === 'ios') {
    isLocEnabled = await requestIosLocationPermission();
  }
  if (isLocEnabled) {
    return isLocEnabled;
  }
  if (!isLocEnabled) {
    Alert.alert(
      'Location needs to be accessed',
      'To use this app, we need location permission',
      [{ text: 'OK', onPress: () => BackHandler.exitApp() }],
    );
  }
};

export const getCurrentPosition = async () => {
  try {
    let currentPosition;
    const permissionGranted = await getLocationPermission();
    if (permissionGranted) {
      currentPosition = await checkCurrentPosition();
    }
    return currentPosition;
  } catch (error) {
    console.log(error, 'error in getCurrentPosition');
  }
};

const checkCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      success => {
        console.log('success', success.coords);
        const { latitude, longitude } = success.coords;
        resolve({ latitude, longitude });
      },
      error => {
        console.log(error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        showLocationDialog: true,
        forceRequestLocation: true,
        forceLocationManager: true,
      },
    );
  });
};
