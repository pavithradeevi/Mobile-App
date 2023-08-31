import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Block} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';


const SplashScrn = () => {
  const navigation = useNavigation();
  const {auth} = useSelector(_state => _state);
  const Dispatch = useDispatch();


  useEffect(() => {
    if (auth?.data?.token) {
      navigation.navigate('initial');
    } else {
      navigation.navigate('login');
    }
  }, [auth]);

  return (
    <Block white center flex={1}>
      <Image source={require('../../assets/images/logo.png')} />
    </Block>
  );
};

export default SplashScrn;

const styles = StyleSheet.create({});
