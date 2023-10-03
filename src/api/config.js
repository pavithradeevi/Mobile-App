import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = '';
const productionURL = '';
const testURL = 'http://103.6.239.161/';

export const Axios = axios.create({
  baseURL: testURL,
});

Axios.interceptors.request.use(async config => {
  const jsonValue = await AsyncStorage.getItem('@auth');
  const user = await JSON.parse(jsonValue);
  console.log("user",user)

  if (user != null && config.headers['Authorization'] === undefined) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});

// publicAxios.defaults.headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };
