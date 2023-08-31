import SQLite from 'react-native-sqlite-storage';
import getDBConnection from './index';
import { TABLE_NAMES } from './tableNames';

export const deleteAll = async () => {
  const db = await getDBConnection();
  db.transaction((tx) => {
    // Delete data from the roster_details table
    tx.executeSql(
      'DELETE FROM roster_details',
      [],
      (_, rosterResults) => {
        console.log('Roster details deleted successfully');
      },
      (error) => {
        console.log('Error deleting roster details:', error);
      }
    );

    // Delete data from the personal details table
    tx.executeSql(
      'DELETE FROM personal_details',
      [],
      (_, personalResults) => {
        console.log('Personal details deleted successfully');
      },
      (error) => {
        console.log('Error deleting personal details:', error);
      }
    );
  });
};
