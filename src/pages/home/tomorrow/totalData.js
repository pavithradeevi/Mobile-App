import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tables from './table';
import DutyTable from './dutyTable';


const TotalData=({flightNo,data,onClose,airCraftType,startFrom,endsAt,tablesstart,tablesend,block,fdp,flightDate})=>{

    return(
      <Modal 
      visible={data !== null} 
      animationType="slide" 
      transparent
      >
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
             <ScrollView>
             <Tables 
                  flightNo={flightNo} 
                  airCraftType={airCraftType}
                  startFrom={startFrom}
                  endsAt={endsAt}
                  tablesend={tablesend}
                  tablesstart={tablesstart}
                  block={block}
             />
             
             <DutyTable 
             flightDate={flightDate}
             fdp={fdp} block={block}/>
             </ScrollView>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={24}  />
        </TouchableOpacity>
      </View>
      </View>
  </Modal>
        
    )
};

export default TotalData;

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      // justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 10,
      width:'90%'    
    },
    closeButton: {
      position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    },
    
  });