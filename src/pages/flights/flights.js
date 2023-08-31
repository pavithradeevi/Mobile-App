import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Block, Text, PageHeader} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';

const options = [
  {label: ''},
  {label: ''},
  {label: ''},
  {label: ''},
  {label: ''},
];
const FlightScrn = () => {
  const {sizes, colors} = useDefaultTheme();
  return (
    <Block light container padding>
      <PageHeader center white elevation={2} borderRadius>
        <Text h5>Flights</Text>
      </PageHeader>
      <Block flex={1} padding={0} marginVertical={sizes.s}>
        <Block scroll>
          <Text p bold paddingVertical>
            Monday, 14 Nov
          </Text>
          {options.map((opt, idx) => (
            <Block key={idx} marginVertical={sizes.xs} row alignItems="center">
              <Text p>14:30</Text>
              <Block
                white
                elevation
                flex
                radius
                row
                paddingVertical
                alignItems="center"
                marginLeft={sizes.s}>
                <View style={styles.icon}>
                  <Ionicons name="calendar-outline" color={'black'} size={20} />
                </View>

                <View style={{flex: 1}}>
                  <Text p>Check In</Text>
                  <Text p>India, Mysore</Text>
                </View>
                <View style={styles.imgIcon}>
                  <Ionicons name="receipt" color={'white'} size={20} />
                </View>
              </Block>
            </Block>
          ))}
        </Block>
      </Block>
      {/* <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.block}>
          <Text style={[styles.blockDate, styles.small, styles.dark]}>
            Monday, 14 Nov
          </Text>
          {options.map((opt, idx) => (
            <View key={idx} style={styles.list}>
              <View style={styles.timeBox}>
                <Text style={[styles.timeTxt, styles.small, styles.dark]}>
                  01:20
                </Text>
              </View>
              <View style={styles.listDetailsBox}>
                <View style={styles.icon}>
                  <Ionicons name="calendar-outline" color={'black'} size={20} />
                </View>

                <View style={[styles.flex]}>
                  <Text style={[styles.timeTxt, styles.small, styles.dark]}>
                    Check In
                  </Text>
                  <Text style={[styles.timeTxt, styles.small, styles.lite]}>
                    India, Mysore
                  </Text>
                </View>
                <View style={styles.imgIcon}>
                 
                  <Ionicons name="receipt" color={'white'} size={20} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView> */}
    </Block>
    // <View style={styles.container}>
    // <ScrollView
    //   style={styles.scrollview}
    //   contentContainerStyle={styles.scrollContainer}>
    //   <View style={styles.block}>
    //     <Text style={[styles.blockDate, styles.small, styles.dark]}>
    //       Monday, 14 Nov
    //     </Text>
    //     {options.map((opt, idx) => (
    //       <View key={idx} style={styles.list}>
    //         <View style={styles.timeBox}>
    //           <Text style={[styles.timeTxt, styles.small, styles.dark]}>
    //             01:20
    //           </Text>
    //         </View>
    //         <View style={styles.listDetailsBox}>
    //           <View style={styles.icon}>
    //             <Ionicons name="calendar-outline" color={'black'} size={20} />
    //           </View>

    //           <View style={[styles.flex]}>
    //             <Text style={[styles.timeTxt, styles.small, styles.dark]}>
    //               Check In
    //             </Text>
    //             <Text style={[styles.timeTxt, styles.small, styles.lite]}>
    //               India, Mysore
    //             </Text>
    //           </View>
    //           <View style={styles.imgIcon}>
    //             {/* <Image source={}/> */}
    //             <Ionicons name="receipt" color={'white'} size={20} />
    //           </View>
    //         </View>
    //       </View>
    //     ))}
    //   </View>
    // </ScrollView>
    // </View>
  );
};

export default FlightScrn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    backgroundColor: 'rgb(248,248,248)',
  },
  scrollview: {borderWidth: 0, borderColor: 'green', paddingVertical: 5},
  scrollContainer: {},
  dark: {
    color: 'black',
  },
  small: {
    fontSize: 14,
    includeFontPadding: false,
    fontFamily: 'DMSans-Medium',
    height: 14.5,
  },
  flex: {
    flex: 1,
  },
  block: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  blockDate: {
    marginVertical: 10,
  },
  list: {
    flexDirection: 'row',
    borderWidth: 0,
    marginVertical: 8,
    alignItems: 'center',
  },
  timeBox: {
    width: '15%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  timeTxt: {},
  listDetailsBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    elevation: 8,
    flexDirection: 'row',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    borderWidth: 0,
  },
  imgIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    width: 33,
    height: 33,
    borderRadius: 40,
    elevation: 5,
    backgroundColor: '#007acc',
    borderWidth: 1,
  },
});
