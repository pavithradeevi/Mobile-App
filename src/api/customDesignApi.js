import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import mokdata from './ClrMap.json';

const customDesignApi = async () => {
  try {
    const _data = mokdata;
    return {data: _data, error: false, message: ''};
  } catch (error) {
    console.log(error);
    return {data: '', error: true, message: ''};
  }
};

export default customDesignApi;
