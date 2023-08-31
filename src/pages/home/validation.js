import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {_colors} from '../../../css/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const navigation=useNavigation();
const profession=()=>{   
    navigation.navigate('profession');     
}

const Validation = () => {
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <View>
      <Text style={styles.text}>
      ALL LICENSES ARE VALID                 
      <Icon name="check" size={24} style={{ fontWeight: 'bold' }} color="green"/>      
      </Text>
      </View>
     
      <View style={styles.dot}>
      <TouchableOpacity 
      onPress={profession}       
        style={styles.boxs}>
          <Text>
          <Entypo name="dots-three-vertical" size={21} />
          </Text>
        </TouchableOpacity>
      </View>
      
      </View>      
    </View>
  );
};

export default Validation;

const styles = StyleSheet.create({
    container: {     
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      elevation: 3,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center'
      
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color:'black',
      marginRight:10
      
    },
      dot:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end'
      },
      
    
  });
