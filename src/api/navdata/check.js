import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import { openDatabase } from 'react-native-sqlite-storage';




var db = openDatabase({ name: 'CrewportDatabase.db' });
  


const Check = () => {
 
  

  const fetchNavData =async()=>{
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM navdata_details',
          [],
          (tx, results) => {
            console.log("navdata")
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              console.log('Row:', row);
            }
          },
          (error) => {
            console.log('Error:', error);
          }
        );
      });
    }).catch((error) => {
      console.log(error);
    });
    
  }
  
 
 
   
  useEffect(() => {
  
   
   fetchNavData();
  
  }, []);



 
};

export default Check;

const styles = StyleSheet.create({});


