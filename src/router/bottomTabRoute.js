import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomNavTab from '../components/bottomTab';
import TopNavBar from '../components/topBar';
import {
  CalenderScrn,
  
  FlightScrn,
  HomeScrn,
  MessageScrn,
  SettingScrn,
  TestScrn,
} from '../pages';
import { getRosterDetailsApi } from '../api/roster/rosterDetailsApi';



const Tab = createBottomTabNavigator();
getRosterDetailsApi();

const BottomTabRoute = props => {

  return (
    <Tab.Navigator
      tabBar={tabProps => <BottomNavTab {...tabProps} />}
      screenOptions={{
        header: headerProps => <TopNavBar {...props} />,
        tabBarActiveTintColor: 'red',
      }}>

      
     
      
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => {
            return (
              <Ionicons
                name={focused ? 'ios-home' : 'ios-home-outline'}
                color={color}
                size={25}
                style={{ marginTop: 15 }}
              />
            );
          },
        }}
        name="Home"
        component={HomeScrn}
      />

      <Tab.Screen
      options={{
        tabBarLabel: '',
        tabBarIcon: ({color, focused}) => (
          
          <Ionicons
            name={focused ? 'ios-calendar' : 'calendar-outline'}
            color={color}
            size={25}
            style={{ marginTop: 15 }}
          />
        ),
      }}
      
      name="calender"
      component={CalenderScrn}     
    />

      

      {/* 
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Ionicons name="airplane-outline" color={color} 
            size={30}
            style={{ marginTop: 15 }} />
          ),
        }}
        name="Flights"
        component={FlightScrn}
      />
    
    */} 
      
      {/* <Tab.Screen
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name={focused ? 'ios-notifications' : 'ios-notifications-outline'}
              color={color}
              size={20}
            />
          ),
        }}
        name="message"
        component={MessageScrn}
      /> */}
      
      {/* <Tab.Screen
        options={{
          tabBarLabel: 'Check In',
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name={focused ? 'ios-calendar' : 'calendar-outline'}
              color={color}
              size={20}
            />
          ),
        }}
        name="checkin"
        component={CheckInScrn}
      /> */}
    
      
      
      

      <Tab.Screen
        options={{
          tabBarLabel: '',

          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
              size={25}
              style={{ marginTop: 15 }}
            />
          ),
        }}
        name="settings"
        component={SettingScrn}
      />
    </Tab.Navigator>
  );
};

export default BottomTabRoute;
