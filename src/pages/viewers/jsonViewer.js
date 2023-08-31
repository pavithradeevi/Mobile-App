import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TextInput as NativeTextInput,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Pdf from 'react-native-pdf';

import {Block, Text, Icons, Button, TextInput} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';
import * as RNFS from 'react-native-fs';

const JsonViewer = () => {
  const {params} = useRoute();
  const {colors} = useDefaultTheme();
  const navigation = useNavigation();
  const [showOptions, setshowOptions] = useState(true);
  const [numberOfPages, setnumberOfPages] = useState('0');
  const [content, setcontent] = useState();

  //   const uri = {uri: `file://${params.filePath}`};

  const writeFile = async () => {
    try {
      const fileData = await RNFS.readFile(`${params.filePath}`);
      console.log(
        fileData,
        `${params.filePath}`,
        '+++++++++++++fileData++++++++++++++++',
      );
      setcontent(fileData);
    } catch (error) {
      throw {error: true};
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await writeFile();
      } catch (error) {
        console.log(error, 'error in JsonViewer useEffect ');
        setcontent('');
      }
    })();
  }, []);
  return (
    <Block flex={1} padding={0}>
      <Block scroll>
        {/* <NativeTextInput multiline value={content} /> */}
        <Text>{content}</Text>
      </Block>
    </Block>
  );
};

export default JsonViewer;

const styles = StyleSheet.create({
  myImageStyle: {
    height: '100%',
    width: '100%',
  },
  pdfStyle: {
    flex: 1,
    // width: '100%',
    // height: Dimensions.get('window').height - 100,
  },
});
