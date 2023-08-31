import {createSlice} from '@reduxjs/toolkit';
import {LoginRequest} from '../../api/user/authApi';
import ToastMsg from '../../components/toastMsg';
import { deleteAllData } from '../../db/deleteTable';
import { deleteAll } from '../../db/deleteAll';
import { clearPersonalDetails } from './profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthSlice = createSlice({
  name: 'authentication',
  initialState: {
    loading: false,
    data: {},
    error: false,
    message: '',
  },
  reducers: {
    login: (state, {payload}) => {
      state.error = false;
      state.data = payload;
      state.loading = false;
      return state;
    },
    logOut: state => {
      state.error = false;
      state.data = {};
      state.loading = false;
      return state;
    },
    loading: (state, {payload}) => {
      state.loading = payload;
      return state;
    },
  },
});

export const {login, loading, logOut} = AuthSlice.actions;

export const loginAction = (name, password) => {
  return async Dispatch => {
    Dispatch(loading(true));
    try {
      deleteAll();
      const response = await LoginRequest(name, password);
      Dispatch(login(response.data));
         console.log(response.data, 'response in loginAction');
         
       
      return {error: false};
    } catch (error) {
      console.log(error, 'error in  loginAction');
      Dispatch(loading(false));
      ToastMsg(error.message);
      throw {error: true};
    }
  };
};




export const logOutAction = () => {
  return async Dispatch => {
    await deleteAllData(); 
    Dispatch(logOut());
    Dispatch(clearPersonalDetails()); 
    await AsyncStorage.clear(); 
  };
};

// export const logOutAction = () => {
//   return Dispatch => {
//     Dispatch(logOut());
//   };
// };


export default AuthSlice.reducer;
