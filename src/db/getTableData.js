import getDBConnection from './index';

export const getAllTableData = async tableName => {
  var temp = [];
  try {
    const db = await  getDBConnection();
    await db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${tableName}`, [], (tx, results) => {
        console.log(results.rows.item(0), 'results');
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        // console.log("temp",db);
      });
    });
    return temp;
  } catch (error) {
    console.log(error, 'error in getAllTableData');
  }

};
