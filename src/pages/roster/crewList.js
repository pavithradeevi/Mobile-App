import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const CrewList = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const db = SQLite.openDatabase({ name: 'CrewportDatabase.db', location: 'default' });

    const query = `
      SELECT crewCode, crewDesig, flightDate, patternNo, flightNo, deptTime, arrTime, startFrom, endsAt,
          flightFrom, flightTo, restPeriod, aircraftType, patternStTime, patternEndTime, id, isVoilated, voilationReason,
          reptIn, reptOut, createdDate, modifiedDate FROM roster_details
          WHERE strftime('%Y-%m', flightDate) = strftime('%Y-%m', 'now', 'localtime')
    `;

    db.transaction((tx) => {
      tx.executeSql(query, [], (_, { rows }) => {
        const fetchedRows = rows.raw();
        console.log('Fetched Rows:', fetchedRows); 
  
        setTableData(fetchedRows);
      });
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOfMonth = date.getDate();
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' }).slice(0, 3); 
    return `${dateOfMonth},${dayOfWeek}`;
  };
  
  
  

  return (
   
    
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.headerCell}>DATE</Text>
        <View style={styles.columnSeparator}></View>
        
        <Text style={styles.headerCell}>CREW LIST</Text>
        <View style={styles.columnSeparator}></View>
        <Text style={styles.headerCell}>REMARKS</Text>
      </View>
     
      {tableData.reduce((uniqueRows, row) => {
        const existingRow = uniqueRows.find(
          (uniqueRow) => formatDate(uniqueRow.flightDate) === formatDate(row.flightDate)
        );
        if (!existingRow) {
          uniqueRows.push(row);
        }
        return uniqueRows;
      }, []).map((row, rowIndex) => {
        // Filter all rows with the same flightDate
        const sameDateRows = tableData.filter(
          r => formatDate(r.flightDate) === formatDate(row.flightDate)
        );
        
        

        return (
          <View key={rowIndex} style={styles.row}>
            <Text style={styles.cell}>{formatDate(row.flightDate)}</Text>
           
            <View style={styles.columnSeparator}></View>
            <Text style={styles.cell}>
              crew list
            </Text>
            <View style={styles.columnSeparator}></View>
            <Text style={styles.cell}>
              REMARKS
            </Text>
          </View>
        );
      })}
      
        </View>

    
  );
  
};

const styles = StyleSheet.create({

    table: {
      borderWidth: 1,
      borderColor: 'gray',
      marginTop: 20,
      
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: 'gray',
    },
    headerCell: {
      flex: 1,
      padding: 10,
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize:13
    },
    cell: {
      flex: 1,
      padding: 10,
      textAlign: 'left',
      fontSize:10
    },
    columnSeparator: {
      width: 1,
      backgroundColor: 'gray',
    },
    hiContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
  });
  


export default CrewList;
