import { Modal, ScrollView, StyleSheet, Text as NativeText, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailsTable from './detailsTable';
import customDesignApi from '../../api/customDesignApi';
import colorMap from '../../api/ClrMap.json';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { _colors } from './../../css/colors';
import { Block, PageHeader, Text } from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';
import { openDatabase } from 'react-native-sqlite-storage';
import {getRosterDetailsApi} from '../../api/roster/rosterDetailsApi';
import Switch from './switch';
import { convertDate, convertTimeToMSD } from '../home/timeUtlize';
import SwitchMode from '../home/switchMode';
import { AppContext } from '../../appContext';
import ToggleSwitch from '../home/switchMode';

var db = openDatabase({ name: 'CrewportDatabase.db' });

const CalenderPage = () => {
  const [selectedDate, setselectedDate] = useState(dayjs().format('YYYY-MM-DDT00:00:00'));
  const { colors, sizes } = useDefaultTheme();
  const [showModel, setshowModel] = useState(false);
  const [eventsDate, setEventsDate] = useState([]);
  const [customDesign, setCustomDesign] = useState(colorMap.clrMap);
  const [shouldDisplayOffCode, setshouldDisplayOffCode] = useState(false);
  const [offDates, setOffDates] = useState([]);
  const [showEventPage, setShowEventPage] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  const [eventPage, setEventPage] = useState();
  const [selectedFlightDate, setSelectedFlightDate] = useState(dayjs().format('YYYY-MM-DDT00:00:00'));
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [flightNos,setFlightNos] = useState('');
  const [isMST, setIsMST] = useState(false);
  const { showMst } = useContext(AppContext);



  const checkOffDates = async (dateString) => {
    return new Promise((resolve, reject) => {     
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT crewCode, crewDesig, flightDate, patternNo, flightNo, deptTime, arrTime, startFrom, endsAt,
          flightFrom, flightTo, restPeriod, aircraftType, patternStTime, patternEndTime, id, isVoilated, voilationReason,
          reptIn, reptOut, createdDate, modifiedDate FROM roster_details
          WHERE strftime('%Y-%m', flightDate) = strftime('%Y-%m', 'now', 'localtime')`,
          [],
          (tx, results) => {           
            if (results.rows.length > 0) {
              const flightDates = [];
              const uniqueIds = new Set(); 
              for (let i = 0; i < results.rows.length; i++) {
                const rowData = results.rows.item(i);                
                const uniqueId = rowData.id;                
                if (!uniqueIds.has(uniqueId)) {
                  const flightDate = rowData.flightDate;
                  const patternNo = rowData.patternNo;
                  const startFrom = rowData.startFrom;
                  const endsAt = rowData.endsAt;
                  flightDates.push({ flightDate, patternNo, rowData, startFrom, endsAt});                  
                  uniqueIds.add(uniqueId); 
                }
              }
              resolve(flightDates);            
            } else {
              resolve([]);
            }
          },
          (error) => {
            console.error('Failed to execute SQL query:', error);
            reject(error);
          }
        );
      });
    })
      .then((flightDates) => {
        setOffDates(flightDates);
        showDataWithFlightDates(flightDates);    
         
        return flightDates;
      })
      .catch((error) => {
        console.error('Failed to fetch off dates:', error);
      });
  };
  
  const showDataWithFlightDates = (flightDates) => {
    flightDates.forEach((flight) => {
      const { flightDate, rowData } = flight;
    });
  };

  useEffect(() => {
    if (selectedFlightDate) {
      const filteredFlightDates = eventDetails.filter(
        (flight) => flight.flightDate === selectedFlightDate
      );
      showDataWithFlightDates(filteredFlightDates);
    }
  }, [selectedFlightDate, eventDetails]);

  useEffect(() => {
    getRosterDetailsApi();
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('YY-MM-DD') + 'T00:00:00';
      checkOffDates(formattedDate)     
        .catch((error) => {
          console.error('Error fetching off dates:', error);
        });
    }
  }, [selectedDate]);

  const toggleTimeZone = (mode) => {
    console.log('toggleTimeZone called with mode:', mode);
    setIsMST(mode === 'MST');
    
    
  };
  

  const handleFlightDateSelection = (selectedDate) => {
    setSelectedFlightDate(selectedDate);
    setEventDetails([]); 
    fetchData(selectedDate);
  };

  const fetchData = async (selectedDate) => {
    try {
      const flightDates = await checkOffDates(selectedDate);
      if (!flightDates || flightDates.length === 0) {
        throw new Error('Failed to fetch off dates.');
      } 
      const flightDetails = flightDates.map((flight) => {
        const { flightDate, rowData } = flight;
        return { flightDate, rowData };
      }); 
      setEventDetails((prevEventDetails) => [...prevEventDetails, ...flightDetails]);
    } catch (error) {
      console.error('Failed to fetch off dates:', error);
    }
  };


  
  const dayComp = ({ date, state }) => {
    const dateString = dayjs(date.dateString).format('YYYY-MM-DDT00:00:00');
    const shouldDisplayOff = Array.isArray(offDates) && offDates.some(
      (offDate) => offDate.flightDate === dateString
    );
    const startFrom = Array.isArray(offDates) && offDates.find(
      (offDate)=>offDate.flightDate === dateString)?.startFrom;
    const endsAt=Array.isArray(offDates) && offDates.find(
      (offDate)=>offDate.flightDate === dateString)?.endsAt;
    const patternNo = Array.isArray(offDates) && offDates.find(
      (offDate) => offDate.flightDate === dateString
    )?.patternNo;

    
    let displayText;
    let displayEndsAt = true;
    
    if (patternNo === 'OFF') {
      displayText = 'O';
    } else if (typeof patternNo === 'string' && patternNo.startsWith('FY')) {
      displayText = patternNo.substring(0, 6);
      displayEndsAt = true;
    } else if (typeof patternNo === 'string') {
      displayText = patternNo.substring(0, 4);
      displayEndsAt = false;
    } else {
      displayText = '';
      displayEndsAt = false;
    }
    
    

    return (
      <TouchableOpacity
        onPress={() => {
          setselectedDate(date.dateString);
          setshowModel(!showModel);
          handleFlightDateSelection(date.dateString)
        }}
        style={[
          styles.dateBlock,
          {
            backgroundColor: 
            shouldDisplayOff && (displayText === 'O' || displayText === 'LEAV' || displayText === 'SICK') ? '#D3D3D3' 
            : shouldDisplayOff ? '#b3e0ff' : 'rgb(249,249,249)',
          },
        ]}>
        {shouldDisplayOff && (
          <View>
            {displayText === "O" ? (
              <Text style={{ fontSize: 10}}>O</Text> 
            ):(
              <Text style={{ fontSize: 10 }}>{displayText}</Text>
            )}
          </View>
        )}
        <View style={[styles.dateBox, {}]}>
          <Text
            color={state === 'disabled' ? 'gray' : 'black'}
            textAlign="center">
            {date.day}
          </Text>
        </View>
        {shouldDisplayOff && (
          <View>
            <Text>

             {startFrom && <Text style={{ fontSize: 9 }}>{startFrom}</Text>}
             {displayEndsAt && endsAt && <Text style={{ fontSize: 9 }}>/ {endsAt}</Text>}
            
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };



  return (
    <Block flex padding light>
    <PageHeader borderRadius center>
    <Text h5>Calendar</Text>
  </PageHeader>
  
    
      {showModel && (
  <Modal visible={showModel} animationType="slide" transparent>
  <TouchableWithoutFeedback onPress={() => setshowModel(false)}>
    <View style={styles.modalContainer}>
      <View style={styles.contentBlock}>
      
                  { eventDetails ? (
              <DetailsTable
              eventDetails={eventDetails}
              selectedFlightDate={selectedFlightDate} 
              flightdate={offDates} 
              // isMST = {isMST}  
              isMST = {showMst}                                      
              />
              ) : (
                <Text>-:No Data:-</Text>
                )}
                <TouchableOpacity onPress={() => setshowModel(false)} style={styles.closeButton}>
                
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
</Modal>

)}

     
     
      
      <Block flex marginVertical={sizes.s}>
      
        <Block scroll>
        {/* <SwitchMode selectedMode={isMST ? 'MST' : 'UTC'} onModeChange={toggleTimeZone} /> */} 
        <View style={styles.modeContainer}>
            <ToggleSwitch />
            <Text style={styles.modeText}>{showMst ? "MST" : "UTC"}</Text>
          </View>
        

          <View style={styles.calendarContainer}>
            <Calendar
              initialDate={
                selectedDate
                  ? selectedDate.dateString
                  : dayjs(new Date()).format('YYYY-MM-DDT00:00:00')
              }
              dayComponent={dayComp}
            />
          </View>
        
        </Block>
      </Block>
    </Block>
  );
};

export default CalenderPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(240,240,240)',
    flex: 1,
    paddingHorizontal: 6,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
  },
  calendarContainer: {
    borderRadius: 8,
    elevation: 5,
    padding: 2,
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(100,100,100,0.3)',
  },
  contentBlock: {
    height: '60%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  closeTxt: {
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
    width: 30,
    textAlign: 'center',
    height: 30,
    textAlignVertical: 'center',
    fontSize: 18,
    borderRadius: 20,
  },
  dateBlock: {
    flex: 1,
    minHeight: heightPercentageToDP('8'),
    borderWidth: 2,
    borderColor: 'white',
    marginHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 0,
    zIndex: 10,
    overflow: 'hidden',
    borderRadius: 6,
  },
  dateBox: {
    margin: 2,
    fontSize:15,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  contentBlock: {
    height: '60%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    
  },
  mode:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
    flex:1,
    flexDirection:'row',
    padding:4,
    bottom:10
    
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 50 / 2,
    backgroundColor: "#FA2A0D",
  },
  utccircle:{
    width: 15,
    height: 15,
    borderRadius: 50 / 2,
    backgroundColor: "green",

  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  modeText: {
    marginHorizontal: 8,
    fontSize: 11,
    fontWeight: 'bold',
  },
});
