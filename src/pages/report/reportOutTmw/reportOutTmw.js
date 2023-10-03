import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import { Block, PageHeader, Text } from '../../../components';
import useDefaultTheme from '../../../hooks/useDefaultTheme';
import { getCurrentPosition } from '../../../services/location/getLocation';
import { getRosterDetailsApi } from '../../../api/roster/rosterDetailsApi';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { getNavDataApi } from '../../../api/navdata/navData';


var db = openDatabase({ name: 'CrewportDatabase.db' });

const away = {
  latitude: 12.317082769348149,
  longitude: 76.69692965125222,
};


const ReportoutTmw = () => {
  const navigation = useNavigation();
  const { sizes, colors } = useDefaultTheme();
  const [coordsIs, setcoordsIs] = useState(equal);
  const [currentCoords, setcurrentCoords] = useState();
  const [loading, setloading] = useState(true);
  const [inToTheRange, setinToTheRange] = useState(false);
  const [flightTo, setFlightTo] = useState();
  const [iataData, setIataData] = useState([]);
  const [iataCodeData, setIataCodeData] = useState([]);
  const[lat,setLat] = useState();
  const [lng,setLng] = useState();
  const [equals,setEquals] = useState();

  const fetchData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT crewCode, crewDesig, flightDate, patternNo, flightNo, deptTime, arrTime, startFrom, endsAt,
          flightFrom, flightTo, restPeriod, aircraftType, patternStTime, patternEndTime, id, isVoilated, voilationReason,
          reptIn, reptOut, createdDate, modifiedDate FROM roster_details
          WHERE date(flightDate) = date('now', '+1 day', 'localtime')`,
          [],
        (tx, results) => {
          if (results.rows.length > 0) {
            const flightto = results.rows.raw()[0].flightTo;
            setFlightTo(flightto);
            console.log(flightto, "flightto");
            resolve(flightto);
          }
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

  const fetchNavData = async () => {
    return new Promise((resolve, reject) => {
      const iataData = [];
      const iataCodeSet = new Set(); // Use a Set to store unique values
  
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT iataCode, latRad, lonRad FROM navdata_details',
          [],
          (tx, results) => {
            const len = results.rows.length;
            console.log('Number of rows:', len);
  
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              const { iataCode, latRad, lonRad } = row;
              iataData.push({ iata: iataCode, latRad, lonRad });
              iataCodeSet.add(iataCode);
            }
  
            const iataCodeData = Array.from(iataCodeSet);
            // console.log('iataData:', iataData); // Log the iataData array
            // console.log('iataCodeData:', iataCodeData); // Log the iataCodeData array
  
            resolve({ iataData, iataCodeData });
          },
          (error) => {
            console.log('Error executing SQL:', error); // Log any SQL execution error
            reject(error);
          }
        );
      });
    });
  };
  
  // Call the fetchNavData function and log the results
  fetchNavData()
    .then((data) => {
      console.log('Retrieved Data:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    fetchData()
    .then((flightFrom) => {
      fetchNavData()
        .then((data) => {
          const { iataData, iataCodeData } = data;
          console.log('Retrieved Data:', data);
  
          // Check if flightFrom is in the iataCodeData array
          const matchingIndex = iataCodeData.indexOf(flightFrom);
          if (matchingIndex !== -1) {
            const matchingIataData = iataData[matchingIndex];
            const { latRad, lonRad } = matchingIataData;
            console.log(`Latitude: ${latRad}, Longitude: ${lonRad}`);
            setLat(latRad)
            setLng(lonRad)
          } else {
            console.log(`FlightFrom ${flightFrom} is not in the iataCodeData.`);
          }
        })
        .catch((error) => {
          console.error('Error fetching nav data:', error);
        });
    })
    .catch((error) => {
      console.error('Error fetching flight data:', error);
    });
  
  
  

  useEffect(() => {
    getRosterDetailsApi();
    getNavDataApi();
    fetchNavData();
    fetchData();
  }, []);

  const equal = {
    latitude: lat,
    longitude: lng,
  };

  alert(equal)
  console.log(equal)
  

  useEffect(() => {
    async function fetchData() {
      await fetchNavData();
      console.log('fetchdata')
      if (flightTo) {
        const matchingIndex = iataCodeData.indexOf(flightTo);
  
        if (matchingIndex !== -1) {
          const matchingIataData = iataData[matchingIndex];
          const { iata, latRad, lonRad } = matchingIataData;
  
          console.log(`Found matching iataCode: ${iata}, lat: ${latRad}, lon: ${lonRad}`);
        } else {
          console.log('No matching iataCode found for flightTo:', flightTo);
        }
      } else {
        console.log('flightTo is undefined');
      }
    }
  
    fetchData();
  }, [iataCodeData, iataData, flightTo]);
  
  

  const calculateDistance = async () => {
    const lat1 = (Math.PI * coordsIs.latitude) / 180;
    const lon1 = (Math.PI * coordsIs.longitude) / 180;
    const lat2 = (Math.PI * currentCoords.latitude) / 180;
    const lon2 = (Math.PI * currentCoords.longitude) / 180;

    const distance =
      2 *
      Math.asin(
        Math.sqrt(
          Math.sin((lat1 - lat2) / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon1 - lon2) / 2) ** 2
        )
      );
    console.log(distance, '----distance---');

    if (distance > 1) {
      Alert.alert('You are away from the premises', '', [
        {
          text: 'OK',
        },
      ]);
      setinToTheRange(false);
      setloading(false);
      return;
    }

    setinToTheRange(true);
    setloading(false);
  };

  useEffect(() => {
    (async () => {
      const res = await getCurrentPosition();
      setcurrentCoords({ latitude: res.latitude, longitude: res.longitude });
    })();
  }, []);

  useEffect(() => {
    const fun = async () => {
      await calculateDistance();
    };
    fun();
  }, [currentCoords]);

  return (
    <Block light flex padding>
      <PageHeader borderRadius center>
        <Text h5>Report Out</Text>
        
        
        
      </PageHeader>
      <Block center white marginVertical={sizes.s} radius elevation>
        <Block paddingVertical>
          {loading ? (
            <ActivityIndicator
              animating={loading}
              size="large"
              color={colors.primary}
            />
          ) : (
            <>
              <Text textAlign="center" h4 bold capitalize>
                {inToTheRange
                  ? 'welcome, user name'
                  : 'You are away from the premises'}
              </Text>
              <Text p capitalize>
                {inToTheRange
                  ? `CheckIn Time: ${dayjs().format('YYYY-MM-DD HH:mm')}`
                  : ''}
              </Text>
            </>
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default ReportoutTmw;

const styles = StyleSheet.create({});




