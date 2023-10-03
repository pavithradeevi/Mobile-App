import AsyncStorage from '@react-native-async-storage/async-storage';
import { Axios } from '../config';
import { apiKeys } from '../endPoints';
import { AddDataToTable } from '../../db/addDataToTable';
import { deleteAllData } from '../../db/deleteTable';
import { deleteNav } from '../../db/deletenav';


export const getNavDataApi = async () => {
  try {
    // Make an HTTP GET request
    const response = await Axios.get(
      'http://103.6.239.161/NAVDATA.API/Airport?clientName=firefly&lastModifiedDate=01%2F01%2F1900'
    );

    // Check if the response contains data
    if (response && response.data) {
      const res = response.data;

      // Process the response data and create the 'Data' array
      const Data = res.map((item) => ({
        fixId: item.fixId || '',
        iataCode: item.iataCode || '',
        latRad: item.latRad || '',
        lonRad: item.lonRad || '',
        modifiedDate: '2006-01-01T00:00:00',
      }));

      console.log('Response data in navdata:', response.data);

      // Call the 'AddDataToTable' function with the table name and data
      const tableName = 'navdata_details';
      await AddDataToTable(tableName, Data);
    //  deleteNav();
      // console.log("navdddddddatafffffffff")

      return { data: Data, message: '' };
    } else {
      console.log('No data in response from navdata API.');
      return { data: [], message: 'No data available' };
    }
  } catch (error) {
    console.log('Error from navdata:', error);

    // Handle the error gracefully
    return { data: [], message: 'Error fetching data' };
  }
 
};
