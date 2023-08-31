import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Tables from './formatTable';
import DutyTable from './dutySummary';
import { convertToMSD } from '../home/timeUtlize';


const DetailsTable = ({ eventDetails, selectedFlightDate,flightDate,isMST }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [filteredEventDetails, setFilteredEventDetails] = useState([]);
  const formattedSelectedDate = dayjs(selectedFlightDate).format('YYYY-MM-DDT00:00:00');
  const formattedFlightDate = dayjs(selectedFlightDate).format('DD/MM/YYYY');

  useEffect(() => {
    const filteredDetails = eventDetails.filter((data) => data.flightDate === formattedSelectedDate);
    setFilteredEventDetails(filteredDetails);
    setIsLoading(true);
    setHasData(filteredDetails.length > 0);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [eventDetails, formattedSelectedDate]);



  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (!hasData) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No events for the selected flight date</Text>
      </View>
    );
  }

  const filteredFlightNos = filteredEventDetails.map((data) => data.rowData.flightNo);
  const filteredAircraftType = filteredEventDetails.map((data) => data.rowData.aircraftType);
  const departure = filteredEventDetails.map((data) => data.rowData.flightFrom);
  const arrival = filteredEventDetails.map((data) => data.rowData.flightTo);
  const patternSt = [...new Set(filteredEventDetails.map((data) => {
    const St = data.rowData.patternStTime;
    const formattedTime = St.slice(11, 16);
    return formattedTime;
  }))];
  // console.log(patternSt,"patterst")

  const patternStMST = [...new Set(filteredEventDetails.map((data) => {
    const St = data.rowData.patternStTime;
    const formattedTime = St.slice(11, 16);
    const patternMST = convertToMSD(formattedTime)
    return patternMST;
  }))];
  // console.log(patternStMST,"patterstMSt")

  const patternEnd = [...new Set(filteredEventDetails.map((data) => {
    const End = data.rowData.patternEndTime;
    const formattedTime = End.slice(11, 16);
    return formattedTime;
  }))];

  const patternEndMST = [...new Set(filteredEventDetails.map((data) => {
    const End = data.rowData.patternEndTime;
    const formattedTime = End.slice(11, 16);
    const EndMST = convertToMSD(formattedTime)
    return EndMST
  }))];

  const start = filteredEventDetails.map((data) => {
    const deptTime = data.rowData.deptTime;
    const formattedTime = deptTime.slice(11, 16);
    return formattedTime;
  });

  


 
  const end = filteredEventDetails.map((data) => {
    const arrTime = data.rowData.arrTime;
    const formattedTime = arrTime.slice(11, 16);
    return formattedTime;
  });

  const mstStart = filteredEventDetails.map((data)=>{
    const deptTime = data.rowData.deptTime;
    const formattedmst = deptTime.slice(11,16);
    const mst = convertToMSD(formattedmst);
    return mst
   });
  
  // console.log(mstStart,"mststartttt")  

  const mstend = filteredEventDetails.map((data)=>{
    const arrTime = data.rowData.arrTime;
    const formattedmst = arrTime.slice(11,16);
    const end = convertToMSD(formattedmst);
    return end
   });

  // console.log(mstend,"mstenddd")

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

        const formattedDiff = `${hourDiff.toString().padStart(2, '0')}h${minuteDiff.toString().padStart(2, '0')}m`;
        return formattedDiff;
      } else {
        return 'Invalid time';
      }
    });

    time = timeDifferences;
  } else {
    console.log('Start or end array is empty');
  }


  let mstTime = [];

if (mstStart.length > 0 && mstend.length > 0) {
  const msttimeDifferences = mstStart.map((startTime, index) => {
    const startSplit = startTime.split(':');
    const endSplit = mstend[index].split(':');

    if (startSplit.length === 2 && endSplit.length === 2) {
      const startHours = parseInt(startSplit[0]);
      const startMinutes = parseInt(startSplit[1]);
      const endHours = parseInt(endSplit[0]);
      const endMinutes = parseInt(endSplit[1]);

      let hourDiff = endHours - startHours;
      let minuteDiff = endMinutes - startMinutes;

      // Adjust for negative differences (e.g., when crossing midnight)
      if (minuteDiff < 0) {
        hourDiff--;
        minuteDiff += 60;
      }

      // Adjust for negative hour difference
      if (hourDiff < 0) {
        hourDiff += 24;
      }

      const formattedDiff = `${hourDiff.toString().padStart(2, '0')}h${minuteDiff.toString().padStart(2, '0')}m`;
      return formattedDiff;
    } else {
      return 'Invalid time';
    }
  });

  mstTime = msttimeDifferences;
} else {
  console.log('Start or end array is empty');
}




  let fdp = [];

  if (patternSt.length > 0 && patternEnd.length > 0) {
    const timeDiff = patternSt.map((startTime, index) => {
      const startSplit = startTime.split(':');
      const endSplit = patternEnd[index].split(':');
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
        return 'Invalid time';
      }
    });

    fdp = timeDiff;
  } else {
    console.log('Start or end array is empty');
  }


  let mstfdp = [];

if (patternStMST.length > 0 && patternEndMST.length > 0) {
  const mstfdpDifferences = patternStMST.map((startTime, index) => {
    const startSplit = startTime.split(':');
    const endSplit = patternEndMST[index].split(':');

    if (startSplit.length === 2 && endSplit.length === 2) {
      const startHours = parseInt(startSplit[0]);
      const startMinutes = parseInt(startSplit[1]);
      const endHours = parseInt(endSplit[0]);
      const endMinutes = parseInt(endSplit[1]);

      let hourDiff = endHours - startHours;
      let minuteDiff = endMinutes - startMinutes;

      // Adjust for negative differences (e.g., when crossing midnight)
      if (minuteDiff < 0) {
        hourDiff--;
        minuteDiff += 60;
      }

      // Adjust for negative hour difference
      if (hourDiff < 0) {
        hourDiff += 24;
      }

      const formattedDiff = `${hourDiff.toString().padStart(2, '0')}h${minuteDiff.toString().padStart(2, '0')}m`;
      return formattedDiff;
    } else {
      return 'Invalid time';
    }
  });

  mstfdp = mstfdpDifferences;
} else {
  console.log('Start or end array is empty');
}

// console.log(mstfdp, 'fdpmst');


  const firstFlightDetails = filteredEventDetails.length > 0 ? filteredEventDetails[0] : null;

  const startCon = isMST ? start : mstStart;
  const endCon = isMST ?  end : mstend;
  const timeCon = isMST ?  time : mstTime;
  const fdpcon = isMST ?   fdp : mstfdp;

  return (
    <ScrollView>
      <View>
        {firstFlightDetails ? (
          <TouchableOpacity onPress={() => {}}>
          <ScrollView>
          <Tables
            flightNos={filteredFlightNos}
            aircraft={filteredAircraftType}
            departure={departure}
            arrival={arrival}

            start ={startCon}
            end={endCon}
            block={timeCon}
          />
          </ScrollView>
            <DutyTable 
            flightDate={formattedFlightDate}
            block={timeCon} 
            fdp={fdpcon} />
          </TouchableOpacity>
        ) : (
          <Text>No events for the selected flight date</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsTable;


