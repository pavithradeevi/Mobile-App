import {useState} from 'react';
import {
  Text as NativeText,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {_colors} from '../css/colors';
import {Text} from '../components';
import useDefaultTheme from '../hooks/useDefaultTheme';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const options = [
  {
    label: 'Home',
    inconName: 'ios-home',
    inconOutlineName: 'ios-home-outline',
    routeName: 'Home',
   
  },
  {
    label: 'Folder',
    inconName: 'folder',
    inconOutlineName: 'folder-outline',
    routeName: '',
  },
  {
    label: 'Co Crew',
    inconName: 'ios-hand-right',
    inconOutlineName: 'ios-hand-right-outline',
    routeName: '',
  },
  {
    label: 'Notifications',
    inconName: 'ios-notifications',
    inconOutlineName: 'notifications-outline',
    routeName: '',
  },
  {
    label: 'Roster',
    inconName: 'ios-help-buoy-sharp',
    inconOutlineName: 'ios-help-buoy-outline',
    routeName: 'roster',
  },
  {
    label: 'Calendar',
    inconName: 'calendar',
    inconOutlineName: 'calendar-outline',
    routeName: 'calender',
  },
  {
    label: 'Log',
    inconName: 'ios-bar-chart',
    inconOutlineName: 'bar-chart-outline',
    routeName: '',
  },
  {
    label: 'Leave',
    inconName: 'ios-calendar',
    inconOutlineName: 'ios-calendar-sharp',
    routeName: 'leave',
  },
  {
    label: 'Edocs',
    inconName: 'ios-documents',
    inconOutlineName: 'documents-outline',
    routeName: 'edocs',
  },
  
  {
    label: 'Req Flight',
    inconName: 'ios-airplane',
    inconOutlineName: 'airplane-outline',
    routeName: '',
  },
  {
    label: 'Validity',
    inconName: 'ios-time',
    inconOutlineName: 'ios-time-outline',
    routeName: '',
  },
  {
    label: 'Check In',
    inconName: 'checkmark-circle',
    inconOutlineName: 'checkmark-circle-outline',
    routeName: 'checkIn',
  },
  {
    label: 'Reporting In',
    inconName: 'create',
    inconOutlineName: 'create-outline',
    routeName: 'reportIn',
  },
  {
    label: 'FDTL',
    inconName: 'flame',
    inconOutlineName: 'flame-outline',
    routeName: '',
  },
  {
    label: 'Doc Def Rep',
    inconName: 'albums',
    inconOutlineName: 'albums-outline',
    routeName: '',
  },
  // {
  //   label: 'About',
  //   inconName: 'information-circle-outline',
  //   routeName: '',
  // },
  // {
  //   label: 'Settings',
  //   inconName: 'settings-outline',
  //   routeName: '',
  // },
];

export const CustomeDrawer = props => {
  const navigation = useNavigation();
  // console.log(props, 'CustomeDrawer');
  // console.log(JSON.stringify(props, null, 2));
  const {colors, sizes} = useDefaultTheme();
  const [active, setactive] = useState('Home');
  return (
    <View style={styles.flex}>
      <View style={styles.drawerHeader}>
        <View style={styles.headerContentBlock}>
          <View style={styles.profileIcon}>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={require('../assets/images/flightimage.png')}
            />
          </View>
          <View style={{}} />
          <View>
            <Text h5 bold white>
              Crew Port
            </Text>
            <Text p white>
              crew@gmail.com
            </Text>
          </View>
        </View>
      </View>
      <DrawerContentScrollView>
        <View style={{height: heightPercentageToDP('2')}} />
        {options.map((opt, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              // setactive(opt.label);
              if (opt.routeName) navigation.navigate(opt.routeName);
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={[
              styles.optionBox,
              active === opt.label && styles.activeOpt,
            ]}>
            <Ionicons
              name={active === opt.label ? opt.inconName : opt.inconOutlineName}
              color={active === opt.label ? colors.primary : 'gray'}
              size={20}
            />
            <Text
              p
              color={active === opt.label ? colors.primary : 'gray'}
              marginHorizontal={sizes.s}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>
      <View style={[styles.backgroundCircle]}>
        <View style={[styles.circle, styles.circle0]} />
        {/* <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} /> */}
        <NativeText></NativeText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    overflow: 'hidden',
  },
  drawerHeader: {
    // width: '100%',
    height: 200,
  },
  backgroundImg: {
    flex: 1,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  headerContentBlock: {
    position: 'absolute',
    // backgroundColor: 'rgba(100,100,100,0.7)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  profileIcon: {
    width: 75,
    height: 75,
    borderRadius: 75,
    overflow: 'hidden',
    elevation: 2,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  profilelName: {
    fontSize: 18,
    color: '#fff',
    margin: 5,
    // fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
    paddingHorizontal: 0,
    marginVertical: 0,
  },
  emailLabel: {
    fontSize: 18,
    color: '#fff',
    margin: 5,
    // fontWeight: 'bold',
    fontFamily: 'DMSans-Regular',
    paddingHorizontal: 0,
    marginVertical: 0,
  },
  optionBox: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginVertical: 10,
    paddingHorizontal: widthPercentageToDP('3'),
    paddingVertical: heightPercentageToDP('1.5'),
    borderRadius: 5,
  },
  activeOpt: {
    // backgroundColor: '#BAC2FF',
  },
  activeOptName: {
    color: '#007acc',
  },
  optName: {
    fontSize: 15,
    color: '#4d4d4d',
    fontFamily: 'DMSans-Medium',
    marginHorizontal: 20,
  },

  backgroundCircle: {
    position: 'absolute',
    top: -280,
    left: '-18%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    zIndex: -50,
    flex: 1,
    width: '100%',
    height: 400,
  },
  circle: {
    position: 'absolute',
    borderRadius: 600,
    // borderWidth: 1,
  },
  // circle3: {
  //   backgroundColor: '#b3d7f0',
  //   width: 330,
  //   height: 330,
  // },
  circle2: {
    backgroundColor: _colors.primary,
    width: 300,
    height: 300,
  },
  circle1: {
    backgroundColor: '#e6f2fa',
    width: 400,
    height: 400,
  },
  circle0: {
    backgroundColor: _colors.primary,
    width: 550,
    height: 550,
  },
});
