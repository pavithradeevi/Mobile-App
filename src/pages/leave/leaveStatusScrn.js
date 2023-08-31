import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Block, Button, Text, Icons} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';
import dayjs from 'dayjs';

const LeaveStatusScrn = () => {
  const {sizes, colors} = useDefaultTheme();
  return (
    <Block light container padding>
      <Block scroll>
        <Block row paddingVertical>
          <Text gray>{`${'\u2B24'} ${' '} ${dayjs().format(
            'DD-MM-YYYY',
          )}`}</Text>
        </Block>
        <Block
          white
          radius
          row
          justifyContent="space-between"
          alignItems="center"
          marginVertical
          padding>
          <Block>
            <Text gray>Full day application</Text>
            <Text bold p marginVertical>
              {dayjs().format('ddd,DD MMM')}
            </Text>
            <Text color={'#7E21CE'}>{'Casual'}</Text>
          </Block>
          <Block alignItems="flex-end" justifyContent="center">
            <Button
              radius
              color={'#ABE098'}
              padding={sizes.xs}
              height="auto"
              marginVertical>
              <Text bold color={'#2EB62C'}>
                Approved
              </Text>
            </Button>
            <Button
              radius
              color={'#F6BDC0'}
              padding={sizes.xs}
              height="auto"
              width="100%"
              marginVertical>
              <Text bold color={colors.danger}>
                Cancel
              </Text>
            </Button>
            {/* <Block gray center>
              <Icons iconName="chevron-forward" />
            </Block> */}
          </Block>
        </Block>
        <Block row paddingVertical>
          <Text gray>{`${'\u2B24'} ${' '} ${dayjs().format(
            'DD-MM-YYYY',
          )}`}</Text>
        </Block>
        <Block
          white
          radius
          row
          justifyContent="space-between"
          alignItems="center"
          marginVertical
          padding>
          <Block>
            <Text gray>Full day application</Text>
            <Text bold p marginVertical>
              {dayjs().format('ddd,DD MMM')}
            </Text>
            <Text color={'#7E21CE'}>{'Casual'}</Text>
          </Block>
          <Block alignItems="flex-end" justifyContent="center">
            <Button
              radius
              color={'#ABE098'}
              padding={sizes.xs}
              height="auto"
              marginVertical>
              <Text bold color={'#2EB62C'}>
                Approved
              </Text>
            </Button>
            <Button
              radius
              color={'#F6BDC0'}
              padding={sizes.xs}
              height="auto"
              width="100%"
              marginVertical>
              <Text bold color={colors.danger}>
                Cancel
              </Text>
            </Button>
            {/* <Block gray center>
              <Icons iconName="chevron-forward" />
            </Block> */}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default LeaveStatusScrn;

const styles = StyleSheet.create({});
