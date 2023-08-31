import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Text, Block} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';

const LeaveSummaryScrn = () => {
  const {sizes, colors} = useDefaultTheme();
  return (
    <Block container light padding>
      <Block paddingVertical row>
        <Block
          elevation
          radius
          white
          flex
          background={'#CCD6A6'}
          marginHorizontal
          padding>
          <Text>
            <Text h3>0</Text>/10
          </Text>
          <Text>AL</Text>
        </Block>
        <Block
          elevation
          radius
          flex
          background={'#F4EAD5'}
          marginHorizontal
          padding>
          <Text>
            <Text h3>0</Text>/8
          </Text>
          <Text>CL</Text>
        </Block>
      </Block>
      {/* ------------------------------------------- */}
      <Block paddingVertical row>
        <Block
          elevation
          radius
          background={'#CBEDD5'}
          flex
          marginHorizontal
          padding>
          <Text>
            <Text h3>0</Text>/5
          </Text>
          <Text>HL</Text>
        </Block>
        <Block
          elevation={2}
          radius
          flex
          background={'#E6E5A3'}
          marginHorizontal
          padding>
          <Text>
            <Text h3>NA</Text>
          </Text>
          <Text>MML</Text>
        </Block>
      </Block>
      {/* ------------------------------------------- */}
      <Block padding={0} paddingVertical row>
        <Block
          elevation={2}
          radius
          background={'#BCCEF8'}
          flex
          marginHorizontal
          padding>
          <Text>
            <Text h3>0</Text>/10
          </Text>
          <Text>SL</Text>
        </Block>
        <Block
          elevation={2}
          radius
          flex
          background={'#D2DAFF'}
          marginHorizontal
          padding>
          <Text>
            <Text h3>0</Text>
          </Text>
          <Text>UPL</Text>
        </Block>
      </Block>
      {/* ------------------------------------------- */}
      <Block
        white
        elevation={2}
        margin
        radius
        row
        justifyContent={'space-between'}>
        <Block marginHorizontal padding center flex>
          <Block radius={100} width={80} height={80} center>
            <Block
              radius={100}
              background={'#C5E8B7'}
              width={75}
              height={75}
              center>
              <Text h3 color={'#2EB62C'}>
                2
              </Text>
            </Block>
          </Block>
          <Text></Text>
          <Text textAlign="center">
            Request{'\n'}
            <Text h5>Approved</Text>
          </Text>
        </Block>
        <Block marginHorizontal padding center flex>
          <Block radius={100} width={80} height={80} center>
            <Block
              radius={100}
              background={'#FFF192'}
              width={75}
              height={75}
              center>
              <Text color={'#CCAA00'} h3>
                1
              </Text>
            </Block>
          </Block>
          <Text></Text>
          <Text textAlign="center">
            Request{'\n'}
            <Text h5>Pending</Text>
          </Text>
        </Block>
        <Block marginHorizontal padding center flex>
          <Block radius={100} width={80} height={80} center>
            <Block
              radius={100}
              background={'#F6BDC0'}
              width={75}
              height={75}
              center>
              <Text danger h3>
                3
              </Text>
            </Block>
          </Block>
          <Text></Text>
          <Text textAlign="center">
            Request{'\n'}
            <Text h5>Declined</Text>
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default LeaveSummaryScrn;

const styles = StyleSheet.create({});
