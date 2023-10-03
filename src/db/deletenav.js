import SQLite from 'react-native-sqlite-storage';
import getDBConnection from './index';
import { TABLE_NAMES } from './tableNames';

export const deleteNav = async () => {
  const db = await getDBConnection();
  db.transaction((tx) => {
    // Delete data from the roster_details table
    tx.executeSql(
      'DELETE FROM navdata_details',
      [],
      (_, rosterResults) => {
        console.log('nav Data Deleted Sucessfully');
      },
      (error) => {
        console.log('Error deleting roster details:', error);
      }
    );

  });
};
