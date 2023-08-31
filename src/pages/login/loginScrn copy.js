import {
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import {_colors} from '../../css/colors';
import {Text} from '../../components';
import { getRosterDetailsApi } from '../../api/roster/rosterDetailsApi';

const backgroundImg = require('../../assets/images/flightimage.png');

const statusBarHeight = StatusBar.currentHeight || 1;


const SignInScrn = props => {
  const navigation = useNavigation();
  const [registerStage, setRegisterStage] = useState('sign-in');
  const [sendOtp, setsendOtp] = useState(false);

  const LoginFun = async () => {
    try {
      const jsonValue = JSON.stringify({userId: 'user1', password: 'pass123'});
      await AsyncStorage.setItem('@user', jsonValue);
      navigation.navigate('initial');
      console.log('login');
    } catch (e) {
      // saving error
    }
  };

  const _onPress = ({key, data}) => {
    const fun = {
      login: () => {
        // console.log(key);
        LoginFun();
        
      },
    };
    fun[key](data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerBlock}>
        <Image style={styles.img} source={backgroundImg} resizeMode="cover" />
      </View>
      <View color="rgb(245,245,245)"></View>
      <View style={styles.signInBlock}>
        <View style={styles.OptBlock}>
          <TouchableOpacity
            style={[
              styles.optBtn,
              registerStage === 'sign-in' && styles.active,
            ]}
            onPress={() => {
              setRegisterStage('sign-in');
              setsendOtp(false);
            }}>
            <Text h5 bold primary>
              CREW PORTAL
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputBlock}>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={() => {}}
              placeholder="User ID"
              style={styles.input}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={() => {}}
              placeholder="Password"
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.btnBlock}>
          <View style={styles.mainBtn}>
            <TouchableOpacity
              style={styles.touchMainBtn}
              onPress={() => _onPress({key: 'login'})}>
              <Text h5 white>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScrn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)',
  },
  bannerBlock: {
    backgroundColor: '#7FB6C6',
    // flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 0.65,
  },
  img: {width: '100%', height: '100%'},
  //   signIncontainer: {
  //     position: "absolute",
  //     top: hp("55"),
  //     width: "100%",
  //   },
  signInBlock: {
    backgroundColor: 'white',
    width: '88%',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: hp('3'),
    paddingHorizontal: wp('2'),
    position: 'absolute',
    bottom: hp('6'),
  },
  OptBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: hp('6'),
  },
  optBtn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
  },
  active: {
    borderBottomWidth: 2,
    borderColor: _colors.primary,
  },
  inputBlock: {
    marginVertical: hp('3'),
    paddingVertical: hp('1'),
    alignItems: 'center',
  },
  inputBox: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1'),
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: wp('0'),
    height: hp('5'),
    // borderWidth: 1,
  },
  input: {
    height: '100%',
    paddingHorizontal: wp('1'),
    flex: 1,
    fontSize: 15,
  },
  btnBlock: {
    width: '100%',
    alignItems: 'center',
  },
  mainBtn: {
    width: '90%',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: hp('1'),
  },
  touchMainBtn: {
    paddingVertical: hp('0.7'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _colors.primary,
  },
});
