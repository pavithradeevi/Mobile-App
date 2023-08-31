import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomNavTab from '../components/bottomTab';
import {Icons, Block, Button} from '../components';
import TopNavBar from '../components/topBar';
import useDefaultTheme from '../hooks/useDefaultTheme';
import {LeaveSummaryScrn, LeaveApplyScrn, LeaveStatusScrn} from '../pages';
import {useNavigation} from '@react-navigation/native';
import { McScrn } from '../pages/leave';

const Tab = createBottomTabNavigator();

const LeaveTabRoute = props => {
  const {colors} = useDefaultTheme();
  const navigation = useNavigation();

  const LeftIcon = () => {
    return (
      <Button paddingHorizontal onPress={() => navigation.goBack()}>
        <Icons iconName="arrow-back" color={colors.white} />
      </Button>
    );
  };

  return (
    <Tab.Navigator
      tabBar={tabProps => <BottomNavTab {...tabProps} />}
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      <Tab.Screen
        options={{
          title: 'Summary',
          tabBarLabel: 'Summary',
          headerLeft: () => <LeftIcon />,
          tabBarIcon: ({color, focused}) => {
            return (
              <Ionicons
                name={focused ? 'stats-chart' : 'stats-chart-outline'}
                color={color}
                size={20}
              />
            );
          },
        }}
        name="summary"
        component={LeaveSummaryScrn}
      />

      <Tab.Screen
        options={{
          title: 'Apply leave',
          tabBarLabel: 'Apply leave',
          headerLeft: () => <LeftIcon />,
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name={focused ? 'clipboard' : 'clipboard-outline'}
              color={color}
              size={20}
            />
          ),
        }}
        name="apply"
        component={LeaveApplyScrn}
      />
      <Tab.Screen
        options={{
          title: 'Status',
          tabBarLabel: 'Status',
          headerLeft: () => <LeftIcon />,
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name={focused ? 'checkbox' : 'checkbox-outline'}
              color={color}
              size={20}
            />
          ),
        }}
        name="status"
        component={LeaveStatusScrn}
      />

    {/*   <Tab.Screen
        options={{
          title: 'MC',
          tabBarLabel: 'MC',
          headerLeft: () => <LeftIcon />,
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name={focused ? 'checkbox' : 'checkbox-outline'}
              color={color}
              size={20}
            />
          ),
        }}
        name="MC"
        component={McScrn}
      /> */}
    </Tab.Navigator>
  );
};

export default LeaveTabRoute;
