import { Alert } from 'react-native';
import getDBConnection from './index';
import axios from 'axios';

const tableName = 'roster_details'; // Replace with your actual table name
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiODUwMDM2OSIsImp0aSI6IjAyMzNmMDQ0LTUwYTktNGE3My1iYWUxLTEyYmJmMWMzYzcwMSIsImV4cCI6MTY4OTAwMDc2MCwiaXNzIjoiQW5pbCIsImF1ZCI6IkNyZXcifQ.sH-hm1d40ljvCZgn5VIy4bfun9kRA8jerT5BbuPq58I'; // Replace with your actual bearer token

fetchDataAndInsertIntoTable(tableName, bearerToken);


export const fetchDataAndInsertIntoTable = async (tableName, bearerToken) => {
  try {
    // Make the API request to fetch the data
    const response = await axios.get(
      'http://122.166.251.167/CSTAR.API/RosterAppDetails/ISHAN?StartDate=01%2F01%2F2023&EndDate=06%2F01%2F2023&ModifiedDate=01%2F01%2F2023',
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    const tableData = response.data; // Assuming the response contains the data in the desired format

    // Insert the data into the SQLite table
    await AddDataToTable(tableName, tableData);
  } catch (error) {
    console.log(error, 'error in fetchDataAndInsertIntoTable');
    Alert.alert('Error', 'Failed to fetch and insert data');
  }
};
