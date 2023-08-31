import SQLite from 'react-native-sqlite-storage';
import getDBConnection from './index'


export const deleteAllData = async() => {
    const db=await getDBConnection();
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM roster_details', [], (tx, results) => {
        console.log('Data deleted successfully');
      },
      (error) => {
        console.log('Error deleting data:', error);
      });
    });
  };
  


