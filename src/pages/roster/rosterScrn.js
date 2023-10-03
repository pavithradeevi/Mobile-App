import React, { useContext, useEffect, useState } from 'react';
import { Text, View,StyleSheet, ScrollView, Alert } from 'react-native';
import Table from './table';
import SQLite from 'react-native-sqlite-storage';
import CrewList from './crewList';
import Utctable from './utc/utcTable';
import ToggleSwitch from '../home/switchMode';
import { AppContext } from '../../appContext';

const RosterScrn = () => {
 const { showMst } = useContext(AppContext);
  const [crewCodes, setCrewCode] = useState();
  const [monthText, setMonthText] = useState('');

  useEffect(() => {
    const db = SQLite.openDatabase({ name: 'CrewportDatabase.db', location: 'default' });

    const query = `
      SELECT crewCode, crewDesig, flightDate, patternNo, flightNo, deptTime, arrTime, startFrom, endsAt,
          flightFrom, flightTo, restPeriod, aircraftType, patternStTime, patternEndTime, id, isVoilated, voilationReason,
          reptIn, reptOut, createdDate, modifiedDate,
          strftime('%Y', flightDate) AS year,
          strftime('%m', flightDate) AS month
      FROM roster_details
      WHERE strftime('%Y-%m', flightDate) = strftime('%Y-%m', 'now', 'localtime')
    `;

    db.transaction((tx) => {
      tx.executeSql(query, [], (_, { rows }) => {
        for (let i = 0; i < rows.length; i++) {
          const crewCode = rows.item(i).crewCode;
          const year = rows.item(i).year;
          const month = rows.item(i).month;
          console.log(`Fetching data for ${getMonthName(month)} ${year}`);

          setCrewCode(crewCode);
          setMonthText(`${getMonthName(month)} ${year}`);
        }
      });
    });
  }, []);


  function getMonthName(month) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[parseInt(month, 10) - 1];
  }

  return (
    <View>
    <View style={styles.modeContainer}>
            <ToggleSwitch />
            <Text style={styles.modeText}>{showMst ? "MST" : "UTC"}</Text>
          </View>
    <ScrollView>
    <View style={styles.container}>
    <View style={styles.headings}>
    <Text style={styles.texthead}>ROSTER REPORT - INDIDVIDUAL AUG 2023</Text>
    </View>

   <View>
   <View style={styles.row}>
     <Text style={styles.heading}>NAME</Text>
     <Text style={styles.heading}>BASE</Text>
 <Text style={styles.heading}>ROSTER REPORT</Text>
 <Text style={styles.heading}>AUTHORITY</Text>
     
   </View>
   <View style={styles.row}>
     <Text style={styles.value}>{crewCodes}</Text>
     <Text style={styles.value}>SZB</Text>
 <Text style={styles.value}>{monthText}</Text>
 <Text style={styles.value}> Captian wan Muzairul Wan Mahazir HEAD OF FLIGHT OPERATIONS</Text>
   </View>
   </View>
      
   <View>
        {showMst ? <Table /> : <Utctable />}
      </View>
   <View>
   <CrewList/>
   </View>
   <View style={styles.helloContainer}>
        <Text>* Make Sure all licences are current.</Text>
        <Text>* Check your e-mail and clear your mail boxes.</Text>
        <Text>* Accidents and incidents must be reported in the appropriate from with the VRs.</Text>
      </View>
    </View>
    </ScrollView>
    </View>
  );
};

export default RosterScrn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headings: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16, 
  },
  texthead: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16, 
  },
  heading: {
    flex: 0.5,
    fontWeight: 'bold',
  },
  value: {
    flex: 0.5, 
    alignItems:'flex-start'
    
  },
  helloContainer: {
    marginTop: 20,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});



