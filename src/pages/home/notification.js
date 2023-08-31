import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {_colors} from '../../../css/colors';

const Notification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Message Header</Text>
        <Text style={styles.time}>Time</Text>
      </View>
      <View style={styles.line}></View>
      <View style={[styles.row, styles.centerRow]}>
        <Text style={styles.texts}>Notification Messages</Text>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerRow: {
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    flex: 1,
    justifyContent: 'flex-start',
  },
  time: {
    fontSize: 15,
    justifyContent: 'flex-end',
  },
  texts: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
