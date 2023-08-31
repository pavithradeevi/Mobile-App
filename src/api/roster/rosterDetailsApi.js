import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios} from '../config';
import {apiKeys} from '../endPoints';
import { AddDataToTable } from '../../db/addDataToTable';
import { deleteAllData } from '../../db/deleteTable';

export const getRosterDetailsApi = async () => {
  try {
    const empCode = await AsyncStorage.getItem('@userId');
    // const empCode='ishan';
  
    const startDate = '07/01/2023';
    const endDate = '09/30/2023';
    const modifiedDate = '09/30/2022';
    console.log("api details",
      `${apiKeys.rosterAppDetails}/${empCode}?StartDate=${startDate}&EndDate=${endDate}&ModifiedDate=${modifiedDate}`,
    );
   
    

    const response = await Axios.get(
      `${apiKeys.rosterAppDetails}/${empCode}?StartDate=${startDate}&EndDate=${endDate}&ModifiedDate=${modifiedDate}`,
     
    );
    
    const res = response?.data;
   
    const Data = res?.map(item => ({
      crewCode: item?.crewCode || '',
      crewDesig: item?.crewDesig || '',
      flightDate: item?.flightDate || '',
      patternNo: item?.patternNo || '',
      flightNo: item?.flightNo || '',
      deptTime: item?.deptTime || '',
      arrTime: item?.arrTime || '',
      startFrom: item?.startFrom || '',
      endsAt: item?.endsAt || '',
      flightFrom: item?.flightFrom || '',
      flightTo: item?.flightTo || '',
      restPeriod: item?.restPeriod || '',
      aircraftType: item?.aircraftType || '',
      patternStTime: item?.patternStTime || '',
      patternEndTime: item?.patternEndTime || '',
      id: item?.id || 0,
      isVoilated: item?.isVoilated || '',
      voilationReason: item?.voilationReason || '',
      reptIn: item?.reptIn || 0,
      reptOut: item?.reptOut || 0,
      createdDate: item?.createdDate || '',
      modifiedDate: item?.modifiedDate || '',
    }));
    deleteAllData('roster_details',Data)
    AddDataToTable('roster_details',Data)
    console.log(response.data, 'response in getRosterDetailsApi ');
    return {data: Data, message: ''};
  } catch (error) {
    let err;
    if (error.response) {
      err = error.response?.data || 'Login Faild,Try Again';
      console.log('error from getRosterDetailsApi response');
    } else if (error.request) {
      err = error.request;
    } else {
      err = error;
    }
    console.log(err, 'error from LoginRequest');
    throw {error: false, data: '', message: err};
  }
};
