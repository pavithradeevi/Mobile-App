import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const Utctable = () => {
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
  

  const subtractHoursFromTime = (timeString, hoursToSubtract) => {
    const date = new Date(timeString);
    date.setHours(date.getHours() - hoursToSubtract);

    // Format the date as 'HH:MM'
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    
    return formattedTime;
  };
  
  

  return (
   
    
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.headerCell}>DATE</Text>
        <View style={styles.columnSeparator}></View>
        <Text style={styles.headerCell}>RTTIME</Text>
        <View style={styles.columnSeparator}></View>
        <Text style={styles.headerCells}>DUTY/FLIGHT SEQUENCE</Text>
        <View style={styles.columnSeparator}></View>
        <Text style={styles.headerCell}>BTTIME</Text>
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
        
        const sameDateRows = tableData.filter(
          r => formatDate(r.flightDate) === formatDate(row.flightDate)
        );

        const flightInfo = sameDateRows.map(r => ({
          flightNo: r.flightNo,
          flightFrom: r.flightFrom,
          deptTime: r.deptTime,
        }));
        
        const flightInfoText = flightInfo
        .map(info => {
          let displayText = `${info.flightNo} ${info.flightFrom}`;
          const flightNoLower = info.flightNo.toLowerCase();
          if (!(flightNoLower.startsWith('leave') || flightNoLower.startsWith('sick'))) {
            const timePart = info.deptTime && info.deptTime.includes('T')
              ? subtractHoursFromTime(info.deptTime, 8) 
              : '';
            displayText += ` ${timePart}`;
          }
          return displayText;
        })
        .join(' / ');

 



        return (
          <View key={rowIndex} style={styles.row}>
            <Text style={styles.cell}>{formatDate(row.flightDate)}</Text>
            <View style={styles.columnSeparator}></View>
            <Text style={styles.cell}>
            {row.patternStTime && row.patternStTime.includes('T')
            ? subtractHoursFromTime(row.patternStTime, 8) // Subtract 8 hours
            : ''}
            </Text>
            <View style={styles.columnSeparator}></View>
            <Text style={styles.wideCell}>{flightInfoText}</Text>
            <View style={styles.columnSeparator}></View>
            <Text style={styles.cell}>
            {row.patternEndTime && row.patternEndTime.includes('T')
            ? subtractHoursFromTime(row.patternEndTime, 8) // Subtract 8 hours
            : ''}
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
    borderColor: 'black',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  headerCell: {
    flex: 0.6,
    paddingVertical: 8, // Adjust the vertical padding
    paddingHorizontal: 6, // Adjust the horizontal padding
    fontWeight: 'bold',
    textAlign: 'left',
  },
  headerCells: {
    flex: 1.6,
    paddingVertical: 8, // Adjust the vertical padding
    paddingHorizontal: 6, // Adjust the horizontal padding
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cell: {
    flex: 0.6,
    paddingVertical: 8, // Adjust the vertical padding
    paddingHorizontal: 6, // Adjust the horizontal padding
    textAlign: 'left',
  },
  wideCell: {
    flex: 1.6,
    paddingVertical: 8, // Adjust the vertical padding
    paddingHorizontal: 6, // Adjust the horizontal padding
    textAlign: 'left',
  },
  columnSeparator: {
    width: 1,
    backgroundColor: 'black',
  },
});




export default Utctable;
