import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

import {Block, PageHeader, Text} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';
import {getCurrentPosition} from '../../services/location/getLocation';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';


const away = {
  latitude: 12.317082769348149,
  longitude: 76.69692965125222,
};
const equal = {
  latitude:13.040280,
  longitude: 77.650090,
};

const CheckInScrn = () => {
  const navigation = useNavigation();
  const {sizes, colors} = useDefaultTheme();
  const [coordsIs, setcoordsIs] = useState(equal);
  const [currentCoords, setcurrentCoords] = useState();

  const [loading, setloading] = useState(true);
  const [inToTheRange, setinToTheRange] = useState(false);

  const calculateDistance =async () => {
// console.log("calculate distance");
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
          onPress: () => navigation.navigate('bottomTabs', {screen: 'Home'}),
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
      // alert(currentCoords.latitude)
      // alert(currentCoords.longitude)
    })();
  }, []);
  
      
  

  useEffect(() => {
   
        const fun=async()=>{
          await  calculateDistance();
        }
        fun()
    },
 [ currentCoords]);

 

  return (
    <Block light flex padding>
      <PageHeader borderRadius center>
        <Text h5>Report In</Text>
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

export default CheckInScrn;

const styles = StyleSheet.create({});


