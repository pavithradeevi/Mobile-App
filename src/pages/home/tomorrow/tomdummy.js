import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {_colors} from '../../../css/colors';
import useDefaultTheme from '../../../hooks/useDefaultTheme';
import { openDatabase } from 'react-native-sqlite-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import TotalData from './totalData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { getRosterDetailsApi } from '../../../api/roster/rosterDetailsApi';
import { initializeDatabaseStructure } from '../../../db/initializeDatabaseStructure';
import { useNavigation } from '@react-navigation/native';

getRosterDetailsApi();
initializeDatabaseStructure();



const FlightCards = () => {
  const [flightNo, setFlightNo] = useState('');
  const [startFrom, setStartFrom] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [patternStTime, setPatternStTime] = useState('');
  const [patternEndTime, setPatternEndTime] = useState('');
  const [tdata,setTData] = useState('');
  const [dataVisible, setDataVisible] = useState(false);
  const [dutyCount, setDutyCount] = useState('');
  const [airCraftType,setAirCraftType] = useState('');
  const [tableStart,setTableStart] = useState('');
  const [tableEnd,setTableEnd] = useState('');
  const [tableFlightNo,setTableFlightNo] = useState('');
  const [departure,setDeparture] = useState('');
  const [arrival,setArrival] = useState('');
  const [dutySt,setDutySt] = useState('');
  const [dutyEnd,setDutyEnd] = useState('');

  var db = openDatabase({ name: 'CrewportDatabase.db' });

  const fetchData = async() => {
  
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT crewCode, crewDesig, flightDate, patternNo, flightNo, deptTime, arrTime, startFrom, endsAt,
          flightFrom, flightTo, restPeriod, aircraftType, patternStTime, patternEndTime, id, isVoilated, voilationReason,
          reptIn, reptOut, createdDate, modifiedDate 
   FROM roster_details
   WHERE date(flightDate) = date('now', '+1 day');
   `,
          [],
          (tx, results) => {
            if (results.rows.length > 0) {
              const { flightNo, startFrom, endsAt, patternStTime, patternEndTime } = results.rows.item(0);
              const data = results.rows.raw();
              setTData(data);
              const aircraftType = Array.from((results.rows.raw().map(item => item.aircraftType)));
              const departures = Array.from((results.rows.raw().map(item => item.flightFrom)));
              const arrivals = Array.from((results.rows.raw().map(item => item.flightTo)));
              const starts = Array.from((results.rows.raw().map(item => item.deptTime)));
              const ends = Array.from((results.rows.raw().map(item => item.arrTime)));  
              const stduty=Array.from(new Set(results.rows.raw().map(item => item.patternStTime)));  
              const enduty = Array.from(new Set(results.rows.raw().map(item => item.patternEndTime)));        
              const flightNumbers = Array.from(new Set(results.rows.raw().map(item => item.flightNo)));
              setDutyCount(flightNumbers.length);                
              setAirCraftType(aircraftType)            
              setFlightNo(flightNo);
              setStartFrom(startFrom);
              setEndsAt(endsAt);
              setPatternStTime(patternStTime);
              setPatternEndTime(patternEndTime);
              setTableStart(starts);
              setTableEnd(ends);
              setDutySt(stduty);
              setDutyEnd(enduty);
              setTableFlightNo(flightNumbers);
              setDeparture(departures);
              setArrival(arrivals)
            }
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    }).catch((error) => {
      console.log(error);
    });
  }; 
  
  
  useEffect(() => {
     fetchData();
  }, []);

  const navigation=useNavigation();

  
  const openData =()=>{
    setDataVisible(true);
  };
  
  const closeData=()=>{
    setDataVisible(false);
  }

  const handleCheckInPress = () => {
   
    if (flightNo.startsWith('FY') || flightNo.startsWith('S')) {
      navigation.push('checkin'); 
    }
  };

 



  const start = Array.isArray(tableStart) ? tableStart.map((date) => {
    const formattedDate = new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formattedDate;
  }) : [];
  // console.log(start,'startssssss')

  const end = Array.isArray(tableEnd) ? tableEnd.map((date) => {
    const formattedDate = new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    
    });
    return formattedDate;
  }) : [];
  // console.log(end,"endsss")

  let time=[];

  if (start.length > 0 && end.length > 0) {
    const timeDifferences = start.map((startTime, index) => {
      const startSplit = startTime.split(':');
      const endSplit = end[index].split(':');
  
      // Check if start and end times are valid
      if (startSplit.length === 2 && endSplit.length === 2) {
        const startHours = parseInt(startSplit[0]);
        const startMinutes = parseInt(startSplit[1]);
        const endHours = parseInt(endSplit[0]);
        const endMinutes = parseInt(endSplit[1]);
  
        let hourDiff = endHours - startHours;
        let minuteDiff = endMinutes - startMinutes;
  
        if (minuteDiff < 0) {
          hourDiff--;
          minuteDiff += 60;
        }
  
        const formattedDiff = `${hourDiff.toString().padStart(2, '0')}h${minuteDiff.toString().padStart(2, '0')}m`;
        return formattedDiff;
      } else {
        return "Invalid time";
      }
    });
    
   time = timeDifferences;
    // console.log(time,"timehhh")
    // console.log(timeDifferences,"time");
  } else {
    console.log("Start or end array is empty");
  }


  const stTime = Array.isArray(dutySt) ? dutySt.map((date) => {
    const formattedDate = new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formattedDate;
  }) : [];
  // console.log(stTime,'dutySt')

  const endTime = Array.isArray(dutyEnd) ? dutyEnd.map((date) => {
    const formattedDate = new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    
    });
    return formattedDate;
  }) : [];
  // console.log(endTime,"dutyEnd")

  let fdp=[];

  if (stTime.length > 0 && endTime.length > 0) {
    const timeDifferencess = stTime.map((startTime, index) => {
      const startSplit = startTime.split(':');
      const endSplit = endTime[index].split(':');
  
      // Check if start and end times are valid
      if (startSplit.length === 2 && endSplit.length === 2) {
        const startHours = parseInt(startSplit[0]);
        const startMinutes = parseInt(startSplit[1]);
        const endHours = parseInt(endSplit[0]);
        const endMinutes = parseInt(endSplit[1]);
  
        let hourDiff = endHours - startHours;
        let minuteDiff = endMinutes - startMinutes;
  
        if (minuteDiff < 0) {
          hourDiff--;
          minuteDiff += 60;
        }
  
        const formattedDiff = `${hourDiff.toString().padStart(2, '0')}h${minuteDiff.toString().padStart(2, '0')}m`;
        return formattedDiff;
      } else {
        return "Invalid time";
      }
    });
    
   fdp = timeDifferencess;
    // console.log(time,"fdp")
    // console.log(timeDifferences,"time");
  } else {
    console.log("Start or end array is empty is fdp");
  }

 
  

  
  const convertDateTimeFormat = (dateTime) => {
    const dateObj = new Date(dateTime);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${day}${month}${hours}:${minutes}`;
  };

  const formattedPatternStTime = convertDateTimeFormat(patternStTime);
  const formattedPatternEndTime = convertDateTimeFormat(patternEndTime);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <View style={styles.icon}>
      {flightNo.startsWith('FY')?(
        <Ionicons name="airplane" size={24} />
      ):flightNo.startsWith('S')?(
        <Ionicons name="airplane" size={24} />
      ):flightNo === "OFF" ? (
        <Ionicons name="home" size={24} />
      ):(
        <Ionicons name="desktop" size={24} />
      )}
      </View>
       
        <View style={styles.box}>
          <Text style={styles.flight}>{flightNo}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
  {flightNo.startsWith('FY') || flightNo.startsWith('S') ? (
    <>
    <TouchableOpacity 
    onPress={() => handleCheckInPress()}
    style={[styles.box, styles.button]}
  >
    <Text style={styles.buttonText}>Check-in</Text>
  </TouchableOpacity>

      <TouchableOpacity style={[styles.box, styles.button, { marginLeft: 10 }]}>
        <Text style={styles.buttonText}>Report</Text>
      </TouchableOpacity>
    </>
  ) : null}

  </View>

        <View>
        
        <TouchableOpacity 
        onPress={openData}
        style={[styles.boxs,{ marginLeft: 14 }]}>
          <Text style={styles.equalsText}>
          <Entypo name="dots-three-vertical" size={21} />
          </Text>
        </TouchableOpacity>
        

      {dataVisible && 
        <TotalData
          data={JSON.stringify(tdata)}
          onClose={closeData}   
          flightNo={tableFlightNo}   
          airCraftType={airCraftType}  
          startFrom = {departure}
          endsAt={arrival} 
          tablesstart={start}
          tablesend={end}
          block={time}
          fdp={fdp}
        />
      }
      
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.emptyBox} />
        <View style={styles.box}>
          <Text style={styles.text}>{startFrom}</Text>
        </View>
        <View style={styles.box}>
        <Text style={styles.dutyCountText}>{'.'.repeat(dutyCount)}<Ionicons name="play-sharp" size={24} /></Text>
        </View>
        <View style={[styles.box]}>
          <Text style={styles.text}>{endsAt}</Text>
        </View>

        <View style={[styles.box]}>
          <Text style={[styles.text, styles.dateText]}>{formattedPatternStTime}-{formattedPatternEndTime}</Text>
        </View>
      </View>
    </View>
  );
};

export default FlightCards;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  box: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxs:{
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position:'relative'

  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flight:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',

  },
  emptyBox: {
    flex: 1,
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  equalsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#696969',
    position:'absolute',
    left:20,
    
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  dutyCountText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  icon:{
    marginRight:10,
    color:'black',
    fontWeight: 'bold',
  },
  icons:{
    marginleft:10,
    color:'black',
    fontWeight: 'bold',
  }
  
});
