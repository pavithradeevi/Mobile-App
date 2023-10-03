import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import {_colors} from '../../css/colors';
import {Block, Text, TextInput, Button} from '../../components';
import useTheme from '../../hooks/useTheme';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../redux/slices/authSlice';
import {addPersonalDetailsReducer} from '../../redux/slices/profileSlice';
import {useEffect} from 'react';
import ToastMsg from '../../components/toastMsg';
import RenderIf from '../../components/renderIf';
import { deleteAll } from '../../db/deleteAll';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';
import { getRosterDetailsApi } from '../../api/roster/rosterDetailsApi';
import { openDatabase } from 'react-native-sqlite-storage';


const backgroundImg = require('../../assets/images/flightimage.png');

const statusBarHeight = StatusBar.currentHeight || 1;


const SignInScrn = props => {
  const navigation = useNavigation();
  const {auth} = useSelector(_state => _state);
  const Dispatch = useDispatch();
  const {colors, sizes} = useTheme();

  const [sendOtp, setsendOtp] = useState(false);
  const [userName, setuserName] = useState('8500369');
  const [password, setpassword] = useState('Test@123');
  const [loading, setloading] = useState(false);
  const [emailId, setemailId] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const [authMode, setauthMode] = useState('login');


  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


 

  const LoginFun = async () => {
    if (!userName || userName.length < 3) {
      Alert.alert('Enter Username', 'Please enter a valid username.');
      return;
    }
    if (!password || password.length < 3) {
      Alert.alert('Enter Password', 'Please enter a valid password.');
      return;
    }
    setloading(true);

    const netInfoState = await NetInfo.fetch();
    if (!netInfoState.isConnected) {
      Alert.alert(
        'OFFLINE !',
        'You are currently offline. Please connect to the internet.'
      );
      setloading(false);
      return;
    }
  
    try {
      await Dispatch(loginAction(userName, password));
      await Dispatch(addPersonalDetailsReducer(userName));
    } catch (e) {
      console.log(e);
    }
    setloading(false);
  };
  

 
  const signUpFun = async () => {
    if (!userName || userName?.length < 3)
      return ToastMsg('Enter vaild user name');
    if (!password || password?.length < 3)
      return ToastMsg('Enter vaild password');
    if (!emailId || !emailId.match(mailformat))
      return ToastMsg('Enter vaild email ID');
    setloading(true);
    try {
      await Dispatch(loginAction(userName, password));
      console.log('login su');
    } catch (e) {
      // saving error
      console.log(e);
    }
    setloading(false);
  };

  const _onPress = ({key, data}) => {
    const fun = {
      login: () => LoginFun(),
      signup: () => signUpFun(),
      registerType: () => setauthMode('register'),
      loginType: () => setauthMode('login'),
    };
    fun[key](data);
    
  };

  const _onChange = ({key, data}) => {
    const fun = {
      nameInput: txt => setuserName(txt),
      passwordInput: txt => setpassword(txt),
      email: txt => setemailId(txt),
    };
    fun[key](data);
  };

  useEffect(() => {
    if (auth?.data?.token) {
      navigation.navigate('initial');
    }
  }, [auth]);

  return (
    
    <View style={styles.container}>   
    
      <View style={styles.bannerBlock}>
        <Image style={styles.img} source={backgroundImg} resizeMode="cover" />
      </View>
      <View style={styles.signInBlock}>
        <Block white margin={sizes.sm} radius padding>
          <Text alignSelf="center" h5 bold primary uppercase margin={sizes.s}>
            crew port
          </Text>
          <Block
            height={2}
            primary
            width={'45%'}
            marginBottom={sizes.s}
            alignSelf="center"
          />
          <TextInput
            flex={1}
            value={userName}
            borderRadius
            h5
            row
            alignItems="center"
            placeholder="User ID"
            margin={sizes.s}
            onChangeText={txt => _onChange({key: 'nameInput', data: txt})}
          />
          <RenderIf isTrue={authMode === 'register'}>
            <TextInput
              flex={1}
              h5
              value={emailId}
              row
              alignItems="center"
              borderRadius
              placeholder="Email ID"
              margin={sizes.s}
              onChangeText={txt => _onChange({key: 'email', data: txt})}
            />
          </RenderIf>
          <TextInput
            flex={1}
            h5
            row
            value={password}
            alignItems="center"
            borderRadius
            placeholder="Password"
            margin={sizes.s}
            password
            secure={!showPassword}
            onIconPress={() => setshowPassword(!showPassword)}
            onChangeText={txt => _onChange({key: 'passwordInput', data: txt})}
          />

          <RenderIf isTrue={authMode === 'login'}>
            <Button
              center
              primary
              radius
              margin={sizes.s}
              onPress={() => _onPress({key: 'login'})}>
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text h5 white capitalize>
                  login
                </Text>
              )}
            </Button>
          </RenderIf>
          <RenderIf isTrue={authMode === 'register'}>
            <Button
              center
              primary
              radius
              margin={sizes.s}
              onPress={() => _onPress({key: 'signup'})}>
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text h5 white capitalize>
                  Sign Up
                </Text>
              )}
            </Button>
          </RenderIf>
          {/* <RenderIf isTrue={authMode === 'login'}>
            <Text alignSelf="center">
              Don't have account ?{' '}
              <Text
                p
                primary
                bold
                onPress={() => _onPress({key: 'registerType'})}>
                Register
              </Text>
            </Text>
          </RenderIf> */}
          {/* <RenderIf isTrue={authMode === 'register'}>
            <Text alignSelf="center">
              Do you have account ?{' '}
              <Text p primary bold onPress={() => _onPress({key: 'loginType'})}>
                Login
              </Text>
            </Text>
          </RenderIf> */}
        </Block>
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
    flex: 0.7,
  },
  img: {width: '100%', height: '100%'},
  signInBlock: {
    width: '100%',
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
