import {StyleSheet, View,ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';

import {Text, Block, TextInput, Dropdown, Button} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';
import {Picker} from '@react-native-picker/picker';
import dayjs from 'dayjs';
import ImagePicker from 'react-native-image-picker';
import { Alert } from 'react-native';
import { Image as CustomImage } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';




const McScrn = () => {
  const {sizes, colors} = useDefaultTheme();
  const [leaveType, setleaveType] = useState('Medical Emergency');
  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, settoDate] = useState(new Date());
  const [reason, setreason] = useState();
  const [showFromCalender, setshowFromCalender] = useState(false);
  const [showToCalender, setshowToCalender] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);


 


  const pickFile = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        // type:[DocumentPicker.types.pdf],
      });
      setSelectedFiles(response);
      console.log(response,"response")
    } catch (err) {
      console.warn(err);
    }
  }, []);
  const removeFile = () => {
    setSelectedFiles(null);
  };
  

  const pickImage = () => {
    const options = {
      mediaType: 'photo', 
      quality: 1,
    };
  
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.uri);
        console.log('Selected Image URI: ', response.uri);
      }
    });
  }; 

 
  

  const removeImage = () => {
    setSelectedImage(null);
  };
  
 
 
  const _onChange = ({key, data}) => {
    const fun = {
      reason: txt => setreason(txt),
    };
    fun[key](data);
  };

  const handleSubmit = () => {
    if (!selectedImage && selectedFiles.length === 0) {
      Alert.alert('Please upload a document or image.');
    } else {
      console.log('Form submitted!');
    }
  };
  

  
  

  useEffect(() => {}, []);

  return (
    <Block light container padding>
      <Block scroll>
        <Block>
          <Text p textAlign="center">
            Medical Emergency
          </Text>
          <Dropdown borderRadius marginVertical={sizes.xs} height={45} white>
            <Picker
              selectedValue={leaveType}
              onValueChange={itemValue => setleaveType(itemValue)}>
             
              <Picker.Item label="Medical Emergency" value="Medical Emergency" />
            </Picker>
          </Dropdown>
        </Block>
    
        <Block marginVertical={sizes.xs}>
          <Text p textAlign="center">
            Reason
          </Text>
          <TextInput
            borderRadius
            textArea
            h5
            row
            white
            border={0}
            alignItems="center"
            placeholder="Ex: Planning for vaction"
            marginVertical={sizes.xs}
            onChangeText={txt => _onChange({key: 'reason', data: txt})}
          />
        </Block>
        
        <Block>
      {selectedImage && (
        <View>
          <CustomImage
            source={{ uri: selectedImage }}
            style={{ width: 300, height: 200 }}
            onError={(error) => console.log('Image loading error:', error)}
          />
          <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
            <Text style={styles.removeText}>
            <FontAwesome name="remove" size={14} /></Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedFiles &&
        selectedFiles.map((file, index) => (
          <View key={index.toString()}>
            <View style={styles.fileContainer}>
              <Text style={styles.uri} numberOfLines={1} ellipsizeMode={'middle'}>
                {file?.name}
              </Text>
              
              
              <TouchableOpacity onPress={() => removeFile(index)}>
                <Text style={styles.removeText}>
                <FontAwesome name="remove" size={14} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Block>
    
      </Block>
      
      <Block style={styles.block}>
      
      <View style={styles.button}>
   

      <Button radius primary marginVertical onPress={pickFile}>
        <Text p white>{`Upload Document`}</Text>
      </Button>
      </View>
      <View style={styles.button1}>
  
  <Button radius primary marginVertical onPress={pickImage}>
    <Text p white>
      <Ionicons name="camera-outline" size={24} />
    </Text>
  </Button>
</View>

      
      </Block>
      
      

      <Button radius primary marginTop onPress={handleSubmit}>
      <Text p white>{`Submit`}</Text>
    </Button>

    </Block>
  );
};

export default McScrn;

const styles = StyleSheet.create({
  block:{
    flexDirection:'row',
    justifyContent:'center',
    
  },
  button:{
    padding:10,
    flex:1,
    justifyContent:'space-evenly'

  },
  button1:{
    padding:10,
   flex:0.4,
    justifyContent:'space-evenly'

  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  removeText: {
    color: 'gray',
    fontSize: 10,
  },
  fileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    marginBottom: 10,
  },
  uri: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
 
});
