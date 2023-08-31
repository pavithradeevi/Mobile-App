import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Text, Block, TextInput, Dropdown, Button} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';
import {Picker} from '@react-native-picker/picker';
import dayjs from 'dayjs';

const LeaveApplyScrn = () => {
  const {sizes, colors} = useDefaultTheme();
  const [leaveType, setleaveType] = useState('');
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [reason, setreason] = useState();
  const [showFromCalender, setshowFromCalender] = useState(false);
  const [showToCalender, setshowToCalender] = useState(false);

  const _onChange = ({key, data}) => {
    const fun = {
      reason: txt => setreason(txt),
    };
    fun[key](data);
  };
  // const _onPress = ({key, data}) => {
  //   const fun = {
  //     from: txt => setshowFromCalender(pre => !pre),
  //     to: txt => setshowToCalender(pre => !pre),
  //   };
  //   fun[key](data);
  // };

  const _onPress = ({ key, data }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const fun = {
      from: () => {
        if (data >= today) {
          setfromDate(data);
        }
        setshowFromCalender(false);
      },
      to: () => {
        if (data >= today) {
          settoDate(data);
        }
        setshowToCalender(false);
      },
    };
  
    if (key === 'from') {
      setshowFromCalender(true);
    } else if (key === 'to') {
      setshowToCalender(true);
    }
  };
  


  

  useEffect(() => {}, []);

  return (
    <Block light container padding>
      <Block scroll>
        <Block>
          <Text p textAlign="center">
            Leave type
          </Text>
          <Dropdown borderRadius marginVertical={sizes.xs} height={45} white>
            <Picker
              selectedValue={leaveType}
              onValueChange={itemValue => setleaveType(itemValue)}>
              <Picker.Item label="Select" value="" />
              <Picker.Item label="AL" value="AL" />
              <Picker.Item label="CL" value="CL" />
              <Picker.Item label="HL" value="HL" />
              <Picker.Item label="MML" value="MML" />
              <Picker.Item label="SL" value="SL" />
              <Picker.Item label="UPL" value="UPL" />
            </Picker>
          </Dropdown>
        </Block>
        {/* <Block > */}
        <Block marginVertical={sizes.xs}>
          <Text p textAlign="center">
            From
          </Text>
          <Button
            radius
            primary
            marginVertical
            onPress={() => _onPress({key: 'from'})}>
            <Text p white>
              {fromDate
                ? dayjs(fromDate).format('DD-MM-YYYY')
                : `Pick "From" date`}
            </Text>
          </Button>
        </Block>
        <Block marginVertical={sizes.xs}>
          <Text p textAlign="center">
            To
          </Text>
          <Button
            radius
            primary
            marginVertical
            onPress={() => _onPress({key: 'to'})}>
            <Text p white>
              {fromDate ? dayjs(toDate).format('DD-MM-YYYY') : `Pick "To" date`}
            </Text>
          </Button>
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
        {showFromCalender && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromDate || new Date()}
            mode={'date'}
            minimumDate={new Date()}
            onChange={(e, date) => {
              if (date !== undefined) {
                setfromDate(date);
              }
              setshowFromCalender(false);
            }}
          />
        )}
        
        {showToCalender && (
          <DateTimePicker
            testID="dateTimePicker"
            value={toDate || new Date()}
            mode={'date'}
            minimumDate={new Date()}
            onChange={(e, date) => {
              if (date !== undefined) {
                settoDate(date);
              }
              setshowToCalender(false);
            }}
          />
        )}
        
      </Block>

      <Button radius primary marginTop>
        <Text p white>{`Submit`}</Text>
      </Button>
    </Block>
  );
};

export default LeaveApplyScrn;

const styles = StyleSheet.create({});
