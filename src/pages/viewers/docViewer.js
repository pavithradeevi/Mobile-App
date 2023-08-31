import {Dimensions, Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Pdf from 'react-native-pdf';

import {Block, Text, Icons, Button} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';
import {useState} from 'react';

const DocViewer = () => {
  const {params} = useRoute();
  const {colors} = useDefaultTheme();
  const navigation = useNavigation();
  const [showOptions, setshowOptions] = useState(true);
  const [numberOfPages, setnumberOfPages] = useState('0');

  const uri = {uri: `file://${params.filePath}`};
  return <Block flex={1} padding={0} black></Block>;
};

export default DocViewer;

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
