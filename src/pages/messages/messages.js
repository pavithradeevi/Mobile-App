import {
  Image,
  ScrollView,
  StyleSheet,
  Text as NativeText,
  View,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Block, PageHeader, Text} from '../../components';



const MessageScrn = () => {
  const {notify} = useSelector(_state => _state);
  const Dispatch = useDispatch();

  return (
    <Block flex={1}>
      <PageHeader borderRadius center>
        <Text h5>Notification</Text>
        
      </PageHeader>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.block}>
          {notify?.data?.length > 0 && (
            <Text p>{dayjs().format('dddd, DD MMM')}</Text>
          )}
          {notify?.data?.map((itm, idx) => (
            <View key={idx} style={styles.list}>
              <View style={styles.timeBox}>
                <NativeText style={[styles.timeTxt, styles.small, styles.dark]}>
                  {dayjs(itm.id).format('HH:mm')}
                </NativeText>
              </View>
              <View style={styles.listDetailsBox}>
                <View style={styles.icon}>
                  <Ionicons name="notifications" color={'#007ACC'} size={20} />
                </View>

                <View style={[styles.flex]}>
                  <NativeText
                    style={[styles.timeTxt, styles.small, styles.dark]}>
                    {itm?.title || ''}
                  </NativeText>
                  <NativeText
                    style={[styles.timeTxt, styles.small, styles.lite]}>
                    {itm?.body || ''}
                  </NativeText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Block>
  );
};

export default MessageScrn;

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
    // height: 16,
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
    paddingVertical: 10,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    elevation: 2,
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
    elevation: 2,
    backgroundColor: '#007acc',
  },
  title: {
    fontSize: 20,
  },
});
