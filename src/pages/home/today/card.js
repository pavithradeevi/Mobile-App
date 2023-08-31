import {Image, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {_colors} from '../../../css/colors';
import useDefaultTheme from '../../../hooks/useDefaultTheme';
import { openDatabase } from 'react-native-sqlite-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Data from './data';
import { getRosterDetailsApi } from '../../../api/roster/rosterDetailsApi';
import { initializeDatabaseStructure } from '../../../db/initializeDatabaseStructure';
import { useNavigation } from '@react-navigation/native';
import { personalDetailsApi } from '../../../api/user/userDetailsApi';
import { addPersonalDetailsReducer } from '../../../redux/slices/profileSlice';
import PushNotification from 'react-native-push-notification';



var db = openDatabase({ name: 'CrewportDatabase.db' });
  
const FlightCard = () => {
  useEffect(() => {
    async () => {
      // await getRosterDetailsApi();
      await initializeDatabaseStructure();
    }
  }, []);

  const [flightNo, setFlightNo] = useState('');
  const [startFrom,setStartFrom] = useState('');
  const [endsAt,setEndsAt] = useState('');
  const [patternStTime,setPatternStTime] = useState('');
  const [patternEndTime,setPatternEndTime] = useState('');
  const [tData, setTData] = useState('');
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
  const [flightDates,setFlightDates] = useState('');
  const [visible,setVisible] = useState('');
  const [checkinvisible,setCheckinVisible] = useState('');

  const navigation=useNavigation();



  const handleCheckInPress = () => {
    if (flightNo.startsWith('FY') || flightNo.startsWith('S1') || flightNo.startsWith('S2') || flightNo.startsWith('S3')) {
      navigation.navigate('reportIn');
    }
  };
  const handleMC = () => {
    if (flightNo.startsWith('FY') || flightNo.startsWith('S1') || flightNo.startsWith('S2') || flightNo.startsWith('S3')) {
      navigation.navigate('mc');
    }  
    
  };
  
  
  const openData = ()=>{
    setDataVisible(true);
  };
  
  const closeData = ()=>{
    setDataVisible(false);
  }
  const fetchData = async() => {

    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT crewCode, crewDesig, flightDate, patternNo, flightNo, deptTime, arrTime, startFrom, endsAt,
          flightFrom, flightTo, restPeriod, aircraftType, patternStTime, patternEndTime, id, isVoilated, voilationReason,
          reptIn, reptOut, createdDate, modifiedDate FROM roster_details WHERE date(flightDate) = date('now')`,
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
              const flightDate = Array.from(new Set(results.rows.raw().map(item => item.flightDate)));
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
              setTableFlightNo(flightNumbers);
              setDeparture(departures);
              setArrival(arrivals);
              setDutySt(stduty);
              setDutyEnd(enduty);
              setFlightDates(flightDate)
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
    getRosterDetailsApi();
 
   fetchData();
   scheduleNotifications();
  }, []);


  const start = Array.isArray(tableStart) ? tableStart.map((date) => {
    const formattedDate = new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formattedDate;
  }) : [];

  useEffect(() => {
    const targetTime = Array.isArray(tableStart) ? new Date(tableStart[0]) : null;
    if (targetTime) {
      targetTime.setHours(targetTime.getHours() - 24);
      const currentTime = new Date();
      setVisible(currentTime >= targetTime);
    }
    console.log(targetTime,"targetsss")
    
  }, [tableStart]);

  useEffect(() => {
    const targetcheckinTime = Array.isArray(tableStart) ? new Date(tableStart[0]) : null;
    if (targetcheckinTime) {
      targetcheckinTime.setHours(targetcheckinTime.getHours() - 30);
      const currentTime = new Date();
      setCheckinVisible(currentTime >= targetcheckinTime);
    }
    console.log(targetcheckinTime,"targetsss")
    
  }, [tableStart]);

  // const scheduleNotifications = () => {
  //   const currentTime = new Date();
  //   const targetCheckinTime = Array.isArray(tableStart) ? new Date(tableStart[0]) : null;
  
  //   if (targetCheckinTime) {
  //     targetCheckinTime.setHours(targetCheckinTime.getHours() - 24);
  
  //     if (currentTime >= targetCheckinTime && currentTime < targetCheckinTime + 24 * 60 * 60 * 1000) {
  //       // Schedule notifications every 1 hour within the 24-hour window
  //       const numberOfNotifications = Math.floor((currentTime - targetCheckinTime) / (60 * 60 * 1000));
  //       for (let i = 1; i <= numberOfNotifications; i++) {
  //         const notificationTime = new Date(targetCheckinTime.getTime() + i * 60 * 60 * 1000);
         
  //        alert(currentTime)
  //         PushNotification.localNotificationSchedule({
  //           message: `It's time to check in! Click the check-in button.`,
  //           date: notificationTime,
  //         });
  //       }
  //     }
  //   }
  // };

  const scheduleNotifications = () => {
    const currentTime = new Date();
    const targetCheckinTime = Array.isArray(tableStart) ? new Date(tableStart[0]) : null;
    
    if (targetCheckinTime) {
      targetCheckinTime.setHours(targetCheckinTime.getHours() - 24);
      

  
if (currentTime >= targetCheckinTime && currentTime < targetCheckinTime + 24 * 60 * 60 * 1000) {
  alert("calling");
  console.log('Notification Times:');
        PushNotification.cancelAllLocalNotifications();
        console.log('Notification Times:');
  
        // Schedule notifications every 5 minutes within the 24-hour window
        const numberOfNotifications = Math.floor((currentTime - targetCheckinTime) / (5 * 60 * 1000));
        for (let i = 1; i <= numberOfNotifications; i++) {
          const notificationTime = new Date(targetCheckinTime.getTime() + i * 5 * 60 * 1000);
          console.log(notificationTime); 
          PushNotification.localNotificationSchedule({
            message: `It's time to check in! Click the check-in button.`,
            date: notificationTime,
          });
        }
      }
    }
  };
  const handleCheckIn = () => {
    // Handle the check-in button click
    if (checkinvisible) {
      // Show a success alert message
      Alert.alert('Success', 'You have successfully checked in!', [
        {
          text: 'OK',
          onPress: () => {
            setCheckinVisible(false); 
           
          },
        },
      ]);
    } else {
      // User clicked the button before the 30-hour window, handle accordingly
      Alert.alert('Error', 'You can only check in within 30 hours of the flight.');
    }
  };
  
 
  const end = Array.isArray(tableEnd) ? tableEnd.map((date) => {
    const formattedDate = new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formattedDate;
  }) : [];


  let time = [];

  if (start.length > 0 && end.length > 0) {
    const timeDifferences = start.map((startTime, index) => {
      const startSplit = startTime.split(':');
      const endSplit = end[index].split(':');
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
        if (hourDiff < 0) {
          hourDiff += 24; // Assuming a 24-hour clock
        }
  
        const formattedDiff = `${(hourDiff < 0 ? '-' : '')}${Math.abs(hourDiff).toString().padStart(2, '0')}h${Math.abs(minuteDiff).toString().padStart(2, '0')}m`;
        return formattedDiff;
      } else {
        return "Invalid time";
      }
    });
  
    time = timeDifferences;
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
 

  const endTime = Array.isArray(dutyEnd) ? dutyEnd.map((date) => {
    const formattedDate = new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    
    });
    return formattedDate;
  }) : [];


  let fdp=[];

  if (stTime.length > 0 && endTime.length > 0) {
    const timeDifferencess = stTime.map((startTime, index) => {
      const startSplit = startTime.split(':');
      const endSplit = endTime[index].split(':');
      if (startSplit.length === 2 && endSplit.length === 2) {
        const startHours = parseInt(startSplit[0]);
        const startMinutes = parseInt(startSplit[1]);
        const endHours = parseInt(endSplit[0]);
        const endMinutes = parseInt(endSplit[1]);
  
        let hourDiff = endHours - startHours;
        let minuteDiff = endMinutes - startMinutes;
  
        if (minuteDiff < 0) {
          hourDiff--; // Adjust hours
          minuteDiff += 60;
        }
  
        // If the end time is on the next day, add 24 hours to the hour difference
        if (hourDiff < 0) {
          hourDiff += 24;
        }
  
        let formattedHourDiff = hourDiff.toString().padStart(2, '0') + 'h';
        let formattedMinuteDiff = minuteDiff.toString().padStart(2, '0') + 'm';
  
        return formattedHourDiff + formattedMinuteDiff;
      } else {
        return "Invalid time";
      }
    });
  
    fdp = timeDifferencess;
  } else {
    console.log("Start or end array is empty is fdp");
  }

  const convertDateTimeFormat = (dateTime) => {
    if (!dateTime) {
      // Return null if dateTime is empty or null
      return null;
    }
  
    const dateObj = new Date(dateTime);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
    return `${day}${month}${hours}:${minutes}`;
  };
  const formattedPatternStTime = convertDateTimeFormat(dutySt);
  const formattedPatternEndTime = convertDateTimeFormat(dutyEnd);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <View style={styles.icon}>
      {flightNo.startsWith('FY') || (flightNo === "S1") || (flightNo === "S2") ?(
        <Ionicons name="airplane" size={24} />
      ):(flightNo === "OFF") || (flightNo === "LEAVE") || (flightNo === "SICK") ||  (flightNo === "AL") ? (
        <Ionicons name="home" size={24} />
      ):(
        <Ionicons name="desktop" size={24} />
      )}
      </View>
        <View style={styles.box}>
          <Text style={styles.flight}>{flightNo}</Text>
        </View>
      {
        checkinvisible && flightNo.startsWith('FY') || (flightNo.startsWith('S3')) || (flightNo.startsWith('S2')) || (flightNo.startsWith('S1')) ?(
                <>
                <TouchableOpacity   
                onPress={handleCheckIn}  
                style={[styles.box, styles.button]}>
                <Text style={styles.buttonText}>Check-in</Text>
                </TouchableOpacity>
                </>
        ):null
      }
        <View style={{ flexDirection: 'row' }}>
        {visible && flightNo.startsWith('FY') || (flightNo.startsWith('S3')) || (flightNo.startsWith('S2')) || (flightNo.startsWith('S1')) ?(
    <>
      <TouchableOpacity 
      onPress={() => handleCheckInPress()}
      style={[styles.box, styles.button, { marginLeft: 10 }]}>
        <Text style={styles.buttonText}>Report</Text>
      </TouchableOpacity>
      <TouchableOpacity   
  onPress={()=>handleMC()}  
      style={[styles.box, styles.button, { marginLeft: 10 }]}>
        <Text style={styles.buttonText}>MC</Text>
      </TouchableOpacity>
      
    </>
  ) : null}
  
  </View>
  
  
      <View style={styles.dot}>
 
  
     <TouchableOpacity 
        onPress={openData}
        style={styles.box}>
          <Text>
          <Entypo name="dots-three-vertical" size={21} />
          </Text>
        </TouchableOpacity>
  

      
        {dataVisible && (
          <Data
            data={JSON.stringify(tData)}
            onClose={closeData}
            flightNo={tableFlightNo}
            airCraftType={airCraftType}
            startFrom={departure}
            endsAt={arrival}
            tablesstart={start}
            tablesend={end}
            block={time}
            fdp={fdp}
            flightDate={flightDates}
          />
        )}
        </View>

      </View>

      <View style={styles.row}>
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
  <Text style={[styles.text, styles.dateText]}>
  {flightNo.startsWith("AL") || (flightNo.startsWith("LEAVE")) || (flightNo.startsWith("SICK"))  || (flightNo.startsWith("OFF"))? (
    <Text>{flightDates}</Text>
  ) : (
    <>
      {formattedPatternStTime ? (
        <Text>{formattedPatternStTime}</Text>
      ) : (
        <Text>..</Text>
      )} -
      {formattedPatternEndTime ? (
        <Text>{formattedPatternEndTime}</Text>
      ) : (
        <Text>..</Text>
      )}
    </>
  )}
</Text>

</View>
      </View>

      
     
    </View>
  );
};

export default FlightCard;

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
    fontSize: 10,
    fontWeight: 'bold',
  },
  dot:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
    flex:1

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
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
  },
  closeText: {
    fontWeight: 'bold',
  },
  
  
});
