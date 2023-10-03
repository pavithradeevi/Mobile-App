import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios} from '../config';
import {apiKeys} from '../endPoints';

export const personalDetailsApi = async userName => {
  console.log("personal")
  try {
    const response = await Axios.get(
      apiKeys.personalDetailsKey + userName + '?ModifiedDate=10/30/2022',
    );
    console.log(response,"responseee")
    const Data = response.data;
    console.log("data 0000000000000000000000nnnnn",Data);
    await AsyncStorage.setItem('@userId', Data?.empCode);
    return {data: Data, message: ''};
  } catch (error) {
    let err;
    if (error.response) {
      err = error.response?.data || 'Login Faild,Try Again';
      console.log('error from personalDetailsApi response');
    } else if (error.request) {
      err = error.request;
    } else {
      err = error;
    }
    console.log(err, 'error from personalDetailsApi');
    throw {error: false, data: '', message: err};
  }
};
