import {Alert} from 'react-native';
import getDBConnection from './index';

export const AddDataToTable =async (tableName, tableData) => {
  try {
    const db =await  getDBConnection();
    if (tableData?.length > 0) {
      const fields = Object.keys(tableData[0]).toString();
      const fieldsLength = Object.keys(tableData[0]);
      const initalValues = fieldsLength?.map(i => `?`);
      let initValues = initalValues.toString();
      const insertQuery = `INSERT INTO ${tableName}(${fields}) values(${initValues})`;

      for (let i = 0; i < tableData.length; i++) {
        const element = tableData[i];
        const values = Object.values(element);
        db.executeSql(insertQuery, values);
      }
      return;
    }
    const fields = Object.keys(tableData).toString();
    const fieldsLength = Object.keys(tableData);
    const initalValues = fieldsLength?.map(i => `?`);
    let initValues = initalValues.toString();
    const insertQuery = `INSERT INTO ${tableName}(${fields}) values(${initValues})`;

    const values = Object.values(tableData);
    return db.executeSql(insertQuery, values);
    
  } catch (error) {
    console.log(error, 'error in AddDataToTable');
  }

 
};


