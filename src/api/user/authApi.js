import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios} from '../config';
import {apiKeys} from '../endPoints';
import { getRosterDetailsApi } from '../roster/rosterDetailsApi';

export const LoginRequest = async (name, password) => {
  try {
    const body = {
      username: name,
      password: password,
    };
    const response = await Axios.post(apiKeys.loginkey, body);
    console.log(response.data, 'response in LoginRequest -----');
    getRosterDetailsApi();
    const Data = {
      token: response.data.token,
     
      expiration: response.data.expiration,
      userName: name || '',
    };
    const jsonValue = JSON.stringify(Data);
    console.log("jsonvalue",jsonValue)
    await AsyncStorage.setItem('@auth', jsonValue);

    return {data: Data, message: ''};
  } catch (error) {
    let err;
    if (error.response) {
      err = error.response?.data || 'Login Faild,Try Again';
      console.log('error from LoginRequest response');
    } else if (error.request) {
      err = error.request;
    } else {
      err = error;
    }
    console.log(err, 'error from LoginRequest');
    throw {error: false, data: '', message: err};
  }
};

export const SignupRequest = async (name, password, email) => {
  try {
    const body = {
      username: name,
      password: password,
      email: email,
    };
    const response = await Axios.post(apiKeys.signupkey, body);
     console.log(response.data, 'response in LoginRequest -----------');
    const Data = {
      token: response.data.token,
      expiration: response.data.expiration,
    };
    const jsonValue = JSON.stringify(Data);
    await AsyncStorage.setItem('@auth', jsonValue);

    return {data: Data, message: ''};
  } catch (error) {
    let err;
    if (error.response) {
      err = error.response?.data || 'Login Faild,Try Again';
      console.log('error from LoginRequest response');
    } else if (error.request) {
      err = error.request;
    } else {
      err = error;
    }
    console.log(err, 'error from LoginRequest');
    throw {error: false, data: '', message: err};
  }
};
