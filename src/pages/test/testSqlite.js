import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Block from '../../components/block';
import Text from '../../components/text';
import Button from '../../components/button';
import {openDatabase} from 'react-native-sqlite-storage';
import {initializeDatabaseStructure} from '../../db/initializeDatabaseStructure';
import {getAllTableData} from '../../db/getTableData';
import {AddDataToTable} from '../../db/addDataToTable';
import {createTable} from '../../db/createTable';
import {TableValueGenerator} from '../../db/tableValueGenerator';
import {TABLE_NAMES} from '../../db/tableNames';
import {getRosterDetailsApi} from '../../api/roster/rosterDetailsApi';
import {useDispatch} from 'react-redux';
import {
  addRosterDataReducer,
  getRosterDataReducer,
} from '../../redux/slices/rosterSlice';

// var db = openDatabase({name: 'UserDatabase.db', location: 'default'});

const TestSqlite = () => {
  const Dispatch = useDispatch();
  const [userName, setUserName] = useState('user1');
  const [userContact, setUserContact] = useState(9876543210);
  const [userAddress, setUserAddress] = useState(
    'jdfj fsdfgdfgsf sdgfyusgdfusg',
  );
  const [flatListItems, setFlatListItems] = useState([]);

  const register_user = async () => {
    const data2 = {
      id: 1,
      empCode: 'string12',
      empName: 'string12',
      empDesig: 'string12',
      emailId: 'string12',
      base: 'string12',
      empNo: 'string12',
      createdDate: '2022-12-27T12:23:31.469Z22',
      modifiedDate: '2022-12-27T12:23:31.469Z22',
    };
    await AddDataToTable(TABLE_NAMES.personal_details, data2);
  };

  const viewUsers = async () => {
    try {
      await getAllTableData(TABLE_NAMES.personal_details);
    } catch (error) {
      console.log(error);
    }
  };

  const creatTable = () => {
    initializeDatabaseStructure();
  };

  return (
    <Block container center>
      <Button primary padding radius margin onPress={creatTable}>
        <Text white>creatTable</Text>
      </Button>
      <Button primary padding radius margin onPress={register_user}>
        <Text white>register_user</Text>
      </Button>
      <Button primary padding radius margin onPress={viewUsers}>
        <Text white>viewUsers</Text>
      </Button>
      <Button
        primary
        padding
        radius
        margin
        onPress={() => Dispatch(addRosterDataReducer())}>
        <Text white>getRosterDetailsApi</Text>
      </Button>
      <Button
        primary
        padding
        radius
        margin
        onPress={() => Dispatch(getRosterDataReducer())}>
        <Text white>getRosterDataReducer</Text>
      </Button>
    </Block>
  );
};

export default TestSqlite;

const styles = StyleSheet.create({});
