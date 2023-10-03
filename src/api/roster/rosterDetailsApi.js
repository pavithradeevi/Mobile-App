import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios} from '../config';
import {apiKeys} from '../endPoints';
import { AddDataToTable } from '../../db/addDataToTable';
import { deleteAllData } from '../../db/deleteTable';





export const getRosterDetailsApi = async () => {


  try {
    const empCode = await AsyncStorage.getItem('@userId');
    // const empCode='ishan';

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear();

    // Calculate the first date of the current month
    const firstDateOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const formattedFirstDate = `${String(firstDateOfMonth.getDate()).padStart(2, '0')}/${String(
      currentMonth
    ).padStart(2, '0')}/${currentYear}`;

    console.log("First date of current month:", formattedFirstDate);

    // Calculate the last date of the last month
    const firstDateOfLastMonth = new Date(currentYear, currentMonth - 2, 1);
    const formattedFirstDateOfLastMonth = `${String(firstDateOfLastMonth.getMonth() + 1).padStart(2, '0')}/${String(
      firstDateOfLastMonth.getDate()
    ).padStart(2, '0')}/${currentYear}`;

    console.log("First date of last month:", formattedFirstDateOfLastMonth);

    // Calculate the first date of the next month
    const lastDateOfNextMonth = new Date(currentYear, currentMonth + 1, 0);
    const formattedLastDateOfNextMonth = `${String(currentMonth + 1).padStart(2, '0')}/${String(
      lastDateOfNextMonth.getDate()
    ).padStart(2, '0')}/${currentYear}`;

    console.log("Last date of next month:", formattedLastDateOfNextMonth);
  
    const startDate = formattedFirstDateOfLastMonth;
    const endDate = formattedLastDateOfNextMonth;
    const modifiedDate = '10/30/2022';
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
