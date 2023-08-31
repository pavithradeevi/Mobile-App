import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StatusBar, StyleSheet, Text, ToastAndroid, View, useWindowDimensions, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TopNavBar from '../../components/topBar';
import BottomNavTab from '../../components/bottomTab';
import FlightCards from './tomorrow/tomCard';
import FlightCard from './today/card';
import {_colors} from '../../css/colors';
import { Block } from '../../components';
import { initializeDatabaseStructure } from '../../db/initializeDatabaseStructure';
import { getRosterDetailsApi } from '../../api/roster/rosterDetailsApi';
import Validation from './validation';
import Notification from './notification';
import SwitchMode from './switchMode';
import TodayMSD from './msd/today';
import TomorrowMSD from './msd/tomorrow';

const Page = ({ loading }) => {
  const [selectedLocation, setSelectedLocation] = useState('UTC'); 
  const windowDimensions = useWindowDimensions();

  const handleModeChange = (mode) => {
    setSelectedLocation(mode);
  };

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
        <SwitchMode selectedMode={selectedLocation} onModeChange={handleModeChange} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : selectedLocation === 'UTC' ? (
          <>
            <FlightCard />
            <Text />
            <FlightCards />
          </>
        ) : selectedLocation === 'MST' ? (
          <>
            <TodayMSD />
            <Text />
            <TomorrowMSD />
          </>
        ) : null}
        <Text />
        <Validation />
        <Text />
        <Notification />
      </Block>
    </Block> 
  );
};

const HomeScrn = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false); 
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar backgroundColor={_colors.primary} />
      <Page loading={loading} />
    </>
  );
};

export default HomeScrn;

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
});
