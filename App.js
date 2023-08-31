import {StatusBar, StyleSheet, Text, View, Alert} from 'react-native';
import React, { useEffect } from 'react';
import Routes from './src/router/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DataStore, PersistDataStore } from './src/redux';
import { getMultipleStoragePermission } from './src/services/permissions/storagePermission';
import getDBConnection from './src/db';
import { getRosterDetailsApi } from './src/api/roster/rosterDetailsApi';
import { personalDetailsApi } from './src/api/user/userDetailsApi';
import { AppProvider } from './src/appContext';
import PushNotification from 'react-native-push-notification'; // or use another notification library



const App = () => {
  

  
  useEffect(() => {
    
    (async () => {
      await getMultipleStoragePermission();
      await getDBConnection();
      await getRosterDetailsApi();
      
    })();
  }, []);

  return (
    <AppProvider>
    <Provider store={DataStore}>
      <PersistGate loading={null} persistor={PersistDataStore}>
        <View style={styles.container}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
          <Routes />
        </View>
      </PersistGate>
    </Provider>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
