import React, { useState,useEffect } from 'react';
import FlightCard from './today/card';
import FlightCards from './tomorrow/tomCard';
import TodayMSD from './msd/today';
import TomorrowMSD from './msd/tomorrow';
import { getRosterDetailsApi } from '../../api/roster/rosterDetailsApi';
import { initializeDatabaseStructure } from '../../db/initializeDatabaseStructure';
import { Block } from '../../components';
import Validation from './validation';
import Notification from './notification';
import BottomNavTab from '../../components/bottomTab';
import TopNavBar from '../../components/topBar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert, BackHandler, StatusBar, StyleSheet, Text, ToastAndroid, View, useWindowDimensions, ActivityIndicator } from 'react-native';
import SwitchMode from './switchMode';
import { AppContext } from '../../appContext';
import { useContext } from 'react';
import { Switch } from 'react-native';
import SettingScrn from '../settings/settingScrn';
import ToggleSwitch from './switchMode';
import { openDatabase } from 'react-native-sqlite-storage';

const Page = ({loading,onModeChange}) => {
    const { showMst } = useContext(AppContext);
 
    const [selectedLocation, setSelectedLocation] = useState('MST'); 
    const windowDimensions = useWindowDimensions();
    const [showSettings, setShowSettings] = useState(false);
  
  
  
    useEffect(() => {
      initializeDatabaseStructure();
      getRosterDetailsApi();
    }, []);

    let backHandlerClickCount = 0;
  
    const handleBackButton = () => {
      if (backHandlerClickCount === 0) {
        backHandlerClickCount++;
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        return true;
      } else {
        BackHandler.exitApp();
        return false;
      }
    };
  
    React.useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }, []);
  
    return (
        <Block container light padding>
        <Block scroll>
        
        <View style={styles.toggleContainer}>
        
       {/* <SettingScrn selectedLocation={selectedLocation} onModeChange={onModeChange}/> */} 
       
      </View>
      <View>
      <View style={styles.modeContainer}>
            <ToggleSwitch />
            <Text style={styles.modeText}>{showMst ? "MST" : "UTC"}</Text>
          </View>
      
     
         
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
            </View>
            
          ) : showMst ? (
            
            <View>
            <FlightCard />
            <Text />
            <FlightCards />

            
             
            </View>
          ) : (
            <View>

            
            <TodayMSD/>
              <Text />
              <TomorrowMSD/>
            </View>
          )
          
        }
        </View>
          
          <Text />
          <Validation />
          <Text />
          <Notification />
        </Block>
      </Block>
    );
  };
   

export default Page;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      // backgroundColor: 'white',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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