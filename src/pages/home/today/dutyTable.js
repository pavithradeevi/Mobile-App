import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { _colors } from '../../../css/colors';
import dayjs from 'dayjs';

const DutyTable = ({ fdp, block,flightDate }) => {
  const formattedflightDate = dayjs(flightDate).format('DD/MM/YYYY');
  const calculateTotalTime = (timings) => {
    let totalMinutes = 0;

    for (let i = 0; i < timings.length; i++) {
      const timing = timings[i];
      const [hours, minutes] = timing.split('h');
      const parsedHours = parseInt(hours, 10);
      const parsedMinutes = parseInt(minutes, 10);
      totalMinutes += parsedHours * 60 + parsedMinutes;
    }

    return totalMinutes;
  };

  const totalFdpMinutes = calculateTotalTime(fdp);
  const blockMinutes = calculateTotalTime(block);

  const totalMinutes = totalFdpMinutes + blockMinutes;
  const restMinutes = (24 * 60) - totalMinutes;

  const calculateTimeFormat = (minutes) => {
    const calculatedHours = Math.floor(minutes / 60);
    const calculatedMinutes = minutes % 60;
    return `${calculatedHours.toString().padStart(2, '0')}h${calculatedMinutes.toString().padStart(2, '0')}m`;
  };

  const totalFdpTime = calculateTimeFormat(totalFdpMinutes);
  const blockTime = calculateTimeFormat(blockMinutes);
  const restTime = calculateTimeFormat(Math.max(0, restMinutes));

  const tableHead = ['Duty Summary'];
  const tableData = [
    ['FDP', totalFdpTime],
    ['BLOCK', blockTime],
    ['END OF DAY', formattedflightDate],
  ];

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderColor: 'transparent' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.heading} />
        {tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            <Cell
              data={rowData[0]}
              textStyle={[styles.text, styles.flexStart, styles.startColumn]}
              flex={0.8}
            />
            <Cell
              data={rowData[1]}
              textStyle={[styles.text, styles.centerText]}
              flex={0.6}
            />
          </TableWrapper>
        ))}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 25, backgroundColor: _colors.textWhite },
  head: { height: 45, backgroundColor: _colors.tableBorder, fontWeight: 'bold', justifyContent: 'center' },
  text: { margin: 6, textAlign: 'center', fontWeight: '250', color: _colors.text },
  row: { flexDirection: 'row', height: 35, backgroundColor: 'whitesmoke' },
  heading: { textAlign: 'center', fontWeight: 'bold', color: _colors.textWhite, fontSize: 17 },
  flexStart: { alignSelf: 'flex-start' },
  centerText: { textAlign: 'center' },
  startColumn: { marginLeft: 40 }, // Add left margin to start column
});

export default DutyTable;
