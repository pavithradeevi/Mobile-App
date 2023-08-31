import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { _colors } from '../../../css/colors';

const Tables = ({ flightNo, airCraftType, startFrom, endsAt, tablesend, tablesstart, block }) => {
  const [tableHead, setTableHead] = useState([
    'FlightNo',
    'A/C',
    'Departure',
    'Arrival',
    'Start',
    'End',
    'Block',
  ]);
  const [widthArr] = useState([90, 80, 80, 80, 80, 80, 90]);

  const generateTableData = () => {
    const maxLength = Math.max(
      flightNo.length,
      airCraftType.length,
      startFrom.length,
      endsAt.length,
      tablesstart.length,
      tablesend.length,
      block.length
    );

    const tableData = [];

    for (let i = 0; i < maxLength; i++) {
      const rowData = [
        flightNo[i] || '',
        airCraftType[i] || '',
        startFrom[i] || '',
        endsAt[i] || '',
        tablesstart[i] || '',
        tablesend[i] || '',
        block[i] || '',
      ];
      tableData.push(rowData);
    }

    return tableData;
  };

  const tableData = generateTableData();

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={StyleSheet.flatten([styles.header, styles.rowStyle])}
              textStyle={styles.texthead}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={StyleSheet.flatten([
                    styles.row,
                    index % 2 && { backgroundColor: 'whitesmoke' },
                    styles.rowStyle,
                  ])}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: _colors.textWhite },
  header: { height: 50, backgroundColor: _colors.tableBorder, fontWeight: 'bold' },
  text: { textAlign: 'center', fontWeight: '250', color: _colors.text },
  texthead: { textAlign: 'center', fontWeight: 'bold', color: _colors.textWhite },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: 'whitesmoke' },
  rowStyle: {} // Add an empty style object
});

export default Tables;
