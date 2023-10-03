import { useEffect, useState } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomeDrawer} from './drawerComp';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BottomTabRoute from './bottomTabRoute';
import {Dimensions,BackHandler} from 'react-native';
import { getRosterDetailsApi } from '../api/roster/rosterDetailsApi';



const windowWidth = Dimensions.get('window').width;

const Drawer = createDrawerNavigator();


const DrawerRoute = () => {
getRosterDetailsApi();


  return (
    <Drawer.Navigator
      drawerContent={props => <CustomeDrawer {...props} />}
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
        drawerStyle: {
          width: windowWidth > 700 ? wp('50') : wp('80'),
        },
      }}>
      <Drawer.Screen name="bottomTabs" component={BottomTabRoute} />
      
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
