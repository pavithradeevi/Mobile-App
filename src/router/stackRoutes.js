import {createStackNavigator} from '@react-navigation/stack';
import useDefaultTheme from '../hooks/useDefaultTheme';

import {
  EdocsScrn,
  ImageViewer,
  LoginScrn,
  MessageScrn,
  PDFViewer,
  SplashScrn,
  DocViewer,
  JsonViewer,
  TestScrn,
  CheckInScrn,
  
  ReportScrn
} from '../pages';

import { McScrn } from '../pages/leave';
import {PersonalDetailsScrn, ProfessionalDetailsScrn} from '../pages/profile';
import DrawerRoute from './drawerRoute';
import LeaveTabRoute from './leaveTabRoute';
import RosterScrn from '../pages/roster';



const Stack = createStackNavigator();

const StackRoute = props => {
  const {colors} = useDefaultTheme();
  
     
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="splash"
        component={SplashScrn}
      />
      <Stack.Screen
      options={{
        title:'Report',
        headerShown: true}}
      name="reportIn"
      component={CheckInScrn}        
    />
    <Stack.Screen
      options={{
        title:'Check In',
        headerShown: true}}
      name="checkIn"
      component={ReportScrn}      
    />
    
      <Stack.Screen
        options={{headerShown: false}}
        name="login"
        component={LoginScrn}
      />
      

      <Stack.Screen
        options={{headerShown: false}}
        name="initial"
        component={DrawerRoute}
      />
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerShown: true,
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="notification"
        component={MessageScrn}
      />
      <Stack.Screen
        options={{
          title: 'E-Docs',
          headerShown: true,
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="edocs"
        component={EdocsScrn}
      />
      <Stack.Screen
      options={{
        title: 'Roster',
        headerShown: true,
        
      }}
      name="roster"
      component={RosterScrn}
    />
      <Stack.Screen
        options={{
          title: 'Gallery',
          headerShown: false,
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="image"
        component={ImageViewer}
      />
      <Stack.Screen
        options={{
          title: 'PDF',
          headerShown: false,
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="pdf"
        component={PDFViewer}
      />
      <Stack.Screen
        options={{
          title: 'Document',
          headerShown: false,
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="doc"
        component={DocViewer}
      />
      <Stack.Screen
        options={{
          title: 'JSON',
          headerShown: false,
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="json"
        component={JsonViewer}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="leave"
        component={LeaveTabRoute}
      />
      <Stack.Screen
        options={{
          title: 'Personal',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="personal"
        component={PersonalDetailsScrn}
      />
      <Stack.Screen
        options={{
          title: 'Professional Details',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="profession"
        component={ProfessionalDetailsScrn}
      />
      <Stack.Screen
        options={{
          title: 'TestScrn',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        name="test"
        component={TestScrn}
      />
      <Stack.Screen
        options={{
          title:'MC',
          headerShown: true}}
        name="mc"
        component={McScrn}
      />
    </Stack.Navigator>
  );
};

export default StackRoute;
