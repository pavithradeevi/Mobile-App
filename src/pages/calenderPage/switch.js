import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Switch = ({ toggleTimeZone }) => {
  const [selectedMode, setSelectedMode] = useState('UTC');

  const handleModeChange = (mode) => {
    console.log('handleModeChange called with mode:', mode);
    setSelectedMode(mode);
    toggleTimeZone(mode); 
  };

  return (
    <View style={styles.switchModeContainer}>
      <TouchableOpacity
        style={[styles.modeButton, selectedMode === 'UTC' ? styles.selectedMode : {}]}
        onPress={() => handleModeChange('UTC')}>
        <Text style={selectedMode === 'UTC' ? styles.selectedText : styles.unselectedText}>UTC</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.modeButton, selectedMode === 'MST' ? styles.selectedMode : {}]}
        onPress={() => handleModeChange('MST')}>
        <Text style={selectedMode === 'MST' ? styles.selectedText : styles.unselectedText}>MST</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  switchModeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  modeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
  selectedMode: {
    backgroundColor: 'gray',
  },
  selectedText: {
    fontWeight: 'bold',
    color: 'white',
  },
  unselectedText: {
    fontWeight: 'normal',
    color: 'black',
  },
});

export default Switch;



