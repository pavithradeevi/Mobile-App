import SQLite from 'react-native-sqlite-storage';

const GetEventsApi = () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase({ name: 'CrewportDatabase1.db' });
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM roster_details',
        [],
        (tx, results) => {
          console.log('Query executed successfully');
          const events = [];
          for (let i = 0; i < results.rows.length; i++) {
            events.push(results.rows.item(i));
          }
          console.log('Events:', events);
          resolve(events);
        },
        error => {
          console.log('Query execution error:', error);
          reject(error);
        }
      );
    });
  });
};

export default GetEventsApi;
