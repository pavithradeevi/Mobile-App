import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';

const CreateDatesArray = () => {
  const dates = [
    {
      start: '2022-11-01 10:30',
      end: '2022-11-01 18:30',
    },
    {
      start: '2022-11-03 10:30',
      end: '2022-11-04 18:30',
    },
    {
      start: '2022-11-10 00:00',
      end: '2022-11-10 18:30',
    },
    {
      start: '2022-11-11 10:30',
      end: '2022-11-15 18:30',
    },
  ];

  const buildArrayOfDates = () => {
    let dateArray = [];
    for (let i = 0; i < dates.length; i++) {
      const element = dates[i];
      const result = getDatesFun(element.start, element.end);
      dateArray = [...dateArray, ...result];
    }
    console.log(dateArray);
  };

  const getDatesFun = (start, end) => {
    const dateArray = [];
    let startDate = dayjs(start);
    let endDate = dayjs(end);
    let startTime = dayjs(start).format('HH:mm');
    let endTime = dayjs(end).format('HH:mm');
    let i = 0;
    let length = dayjs(end).diff(start, 'day');

    while (startDate <= endDate) {
      let currentDate = dayjs(startDate).format('YYYY-MM-DD');
      let stopDate = dayjs(endDate).format('YYYY-MM-DD');
      const comp = {
        tripStart:
          currentDate === stopDate
            ? i === 0
              ? `${currentDate} ${startTime}`
              : `${currentDate} 00:00`
            : i === 0
            ? `${currentDate} ${startTime}`
            : `${currentDate} 00:00`,
        tripEnd:
          currentDate === stopDate
            ? i !== length
              ? `${currentDate} 00:00`
              : `${currentDate} ${endTime}`
            : i !== length
            ? `${currentDate}  00:00`
            : `${currentDate} ${endTime}`,
      };

      dateArray.push(comp);
      startDate = dayjs(startDate).add(1, 'day');
      i += 1;
    }
    return dateArray;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => buildArrayOfDates()}>
        <Text>CreateDatesArray</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateDatesArray;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
