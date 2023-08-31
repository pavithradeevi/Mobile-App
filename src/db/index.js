import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

// enablePromise(true);

 const getDBConnection = async () => {
  let db = openDatabase(
    
    {name: 'CrewportDatabase.db', location: 'default'},
    success => {
      console.log('Databases connected');
    },
    error => {
      console.log('Error in Database connection');
    },
    
  );
  return db;
};

export default getDBConnection;
