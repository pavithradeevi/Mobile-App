import {Dimensions, Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Pdf from 'react-native-pdf';

import {Block, Text, Icons, Button} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';
import {useState} from 'react';

const PDFViewer = () => {
  const {params} = useRoute();
  const {colors} = useDefaultTheme();
  const navigation = useNavigation();
  const [showOptions, setshowOptions] = useState(true);
  const [numberOfPages, setnumberOfPages] = useState('0');

  const uri = {uri: `file://${params.filePath}`};
  return (
    <Block flex={1} padding={0} black>
      <StatusBar
        showHideTransition={'slide'}
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
        networkActivityIndicatorVisible={true}
      />
      {/* <View style={{height: showOptions ? StatusBar.currentHeight : 0}} /> */}
      {showOptions && (
        <>
          <Block
            height={StatusBar.currentHeight}
            black
            zIndex={10}
            padding={0}
          />
          <Block zIndex={10} black>
            <Icons
              press
              onPress={() => navigation.goBack()}
              iconName="arrow-back"
              color={'white'}
            />
          </Block>
        </>
      )}
      <Button
        padding={0}
        position="absolute"
        width={'100%'}
        height={'100%'}
        activeOpacity={1}
        onPress={() => setshowOptions(!showOptions)}>
        <Block flex={1}>
          <Pdf
            source={uri}
            style={styles.pdfStyle}
            onLoadComplete={totalPages => {
              setnumberOfPages(totalPages);
            }}
          />
        </Block>
        <Block center>
          <Text white>{`Page  ${numberOfPages}`}</Text>
        </Block>
      </Button>
    </Block>
  );
};

export default PDFViewer;

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
