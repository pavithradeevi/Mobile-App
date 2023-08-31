import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';



const ProfessionalDetailsScrn = () => {
	
  return (
	<ScrollView>

    <View style={[styles.container]}>
      <View>
        <View style={[styles.table, styles.tableHeader]}>
          <Text style={[styles.cells,styles.bold,{fontFamily:'DMSans-Regular'}]}>Name</Text>
          <Text style={[styles.cells, styles.expiresCells,styles.bold]}>Expires</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Line Training captain conversion</Text>
          <Text style={[styles.cell, styles.expiresCell]}>No expiry</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Simulator Training</Text>
          <Text style={[styles.cell, styles.expiresCell,styles.bold,{fontSize:15}]}>01/01/2023</Text>
        </View>
      </View>
      <View>
        <View style={[styles.table, styles.tableHeader]}>
          <Text style={[styles.cells,styles.bold]}>Personal</Text>
          
        </View>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Middle class 1</Text>
          <Text style={[styles.cell, styles.expiresCell,{color:'red'}]}>Missing</Text>
        </View>
        <View style={[styles.row,{backgroundColor:'#ff6347'}]}>
          <Text style={[styles.cell, styles.cell,]}>Middle class 1</Text>
          <Text style={[styles.cell, styles.expiresCell]}>01/02/2023</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Middle class 2</Text>
          <Text style={[styles.cell, styles.expiresCell,{color:'red'}]}>Missing</Text>
        </View>
      </View>
	  <View>
        <View style={[styles.table, styles.tableHeader]}>
          <Text style={[styles.cells,styles.bold]}>General</Text>
          
        </View>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Fire Fighting</Text>
          <Text style={[styles.cell, styles.expiresCell,styles.bold]}>01/01/2023</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Internal policies</Text>
          <Text style={[styles.cell, styles.expiresCell]}>No expiry</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>COVID procedures</Text>
          <Text style={[styles.cell, styles.expiresCell]}>No expiry</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Operations control center</Text>
          <Text style={[styles.cell, styles.expiresCell]}>No expiry</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Skylegs platform training</Text>
          <Text style={[styles.cell, styles.expiresCell,styles.bold]}>01/01/2023</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Flight crew license</Text>
          <Text style={[styles.cell, styles.expiresCell]}>No expiry</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Instrument rating (CAT I)</Text>
          <Text style={[styles.cell, styles.expiresCell,styles.bold]}>01/01/2023</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Multi engine-plane rating land</Text>
          <Text style={[styles.cell, styles.expiresCell,styles.bold]}>01/01/2023</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Single-engine plane rating land</Text>
          <Text style={[styles.cell, styles.expiresCell,styles.bold]}>01/01/2023</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Basic introduction course</Text>
          <Text style={[styles.cell, styles.expiresCell]}>No expiry</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Flight instructor license</Text>
          <Text style={[styles.cell, styles.expiresCell]}>No expiry</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Flight instructor license</Text>
          <Text style={[styles.cell, styles.expiresCell,styles.bold]}>01/01/2023</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Fire fighting</Text>
          <Text style={[styles.cell, styles.expiresCell,styles.bold]}>01/01/2023</Text>
        </View>
		<View style={styles.row}>
          <Text style={[styles.cell, styles.cell]}>Either seat</Text>
          <Text style={[styles.cell, styles.expiresCell,styles.bold]}>01/01/2023</Text>
        </View>
		
      </View>
    </View>
	</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
	fontFamily:'DMSans-Regular'
	
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
	
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
	
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  
  cell: {
    width: 290,
  },
  cells:{
	width:290,
	fontSize:18

  },
  expiresCell: {
	marginLeft:20,
	justifyContent:'flex-end',
	alignItems:'flex-end'
  },
  expiresCells:{
	marginLeft:20,
	justifyContent:'flex-end',
	alignItems:'flex-end'
  },
  bold:{
	fontWeight:'bold',
	color:'black'
  }
  
});

export default ProfessionalDetailsScrn;
