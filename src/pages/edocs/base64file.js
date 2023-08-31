import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Text, Block} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {testLinks} from './mokdata';
import * as RNFS from 'react-native-fs';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const Basefile = () => {
  const navigation = useNavigation();
  const [fileData, setfileData] = useState();

  const DownloadFile = () => {
    const fs = RNFetchBlob.fs;
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', testLinks.pdf)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        // console.log(imagePath);
        return resp.readFile('base64');
      })
      .then(base64Data => {
        // const _fileData = {
        //   fileName: 'image1',
        //   fileType: 'png',
        //   ext: 'png',
        //   //   data: 'data:image/png;base64,' + base64Data,
        //   data: 'data:application/pdf;base64,' + base64Data,
        // };
        const _fileData = {
          fileName: 'pdf1',
          fileType: 'pdf',
          ext: 'pdf',
          data: base64Data,
        };

        const jsonValue = JSON.stringify(_fileData);
        AsyncStorage.setItem('@pdf', jsonValue);
        // RNFS.write(
        //   RNFS.DownloadDirectoryPath + '/pdfFileName.pdf',
        //   base64Data,
        //   'base64',
        // );
        // console.log(RNFS.DownloadDirectoryPath + '/pdfFileName.pdf');
        // here's base64 encoded image
        // AsyncStorage.setItem()
        // console.log(base64Data);
        // remove the file from storage
        return fs.unlink(imagePath);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const readFile = async () => {
    try {
      //   const DocumentDir = RNFetchBlob.fs.dirs.DownloadDir;
      const jsonValue = await AsyncStorage.getItem('@pdf');
      const responseData = jsonValue != null ? JSON.parse(jsonValue) : null;

      //   let pdfLocation = DocumentDir + '/pdf1.pdf';

      //   RNFetchBlob.fs.writeFile(pdfLocation, responseData.data, 'base64');
      console.log(responseData.data, 'responseData');
      //   setfileData(responseData);

      navigation.navigate('pdf');
    } catch (error) {
      console.log(error, 'error in readFile');
    }
  };

  const _onPress = ({key, data}) => {
    const fun = {
      DownloadFile: data => DownloadFile(data),
      readFile: data => readFile(data),
    };
    fun[key](data);
  };

  const buttons = [
    {
      name: 'Download',
      function: 'DownloadFile',
    },
    {
      name: 'Read File',
      function: 'readFile',
    },
    {
      name: 'Read pdf',
      function: 'readFile',
    },
  ];
  const uri = {uri: fileData?.data};
  return (
    <View>
      {buttons.map((item, idx) => (
        <Button
          key={idx}
          primary
          marginVertical
          onPress={() => _onPress({key: item.function})}>
          <Text white>{item.name}</Text>
        </Button>
      ))}
      {/* {fileData?.data && (
        <Block height={200} width={200}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
            source={{uri: fileData?.data}}
          />
          <Text>Hello</Text>
        </Block>
      )} */}
    </View>
  );
};

export default Basefile;

const styles = StyleSheet.create({});
