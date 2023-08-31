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
  const [crewCode,setCrewCode] = useState();
  const [patternNo,setPatternNo] = useState();
 


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
        setTableData(rows.raw());
        if (rows.length > 0) {
          const crewCode = rows.item(0).crewCode;
          const patternNo = rows.item(0).patternNo;
          console.log(crewCode,"crewcode")
          alert(crewCode)
          // Set the crew code from the query result
          setCrewCode(crewCode);
          setPatternNo(patternNo);
          alert(patternNo)
        }
      });
    });
  }, []);
 
  


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
     <Text style={styles.value}>{crewCode}Mohammed Hussain</Text>
     <Text style={styles.value}> SZB</Text>
 <Text style={styles.value}> 01/08/2023 - 31/08/2023</Text>
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



