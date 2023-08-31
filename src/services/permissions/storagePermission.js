import {PermissionsAndroid} from 'react-native';

export const getStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message:
          'Crew Port App needs access to your storage ' +
          'so you can download files.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log('You can use the Storage');
      return true;
    } else {
      console.log('Storage permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    throw {error: true, message: err};
  }
};

export const getMultipleStoragePermission = async () => {
  try {
    let userResponse;
    if (Platform.OS === 'android') {
      userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
    }
    const WRITE_PERMISSION =
      userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted';
    const READ_PERMISSION =
      userResponse['android.permission.READ_EXTERNAL_STORAGE'] === 'granted';
    if (WRITE_PERMISSION && READ_PERMISSION) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    throw {error: true, message: err};
  }
};
