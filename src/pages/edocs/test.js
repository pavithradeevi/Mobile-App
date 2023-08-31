import {
  BackHandler,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as RNFS from 'react-native-fs';

import {Block, Button, Icons, Text} from '../../components';
import useDefaultTheme from '../../hooks/useDefaultTheme';
import {useEffect} from 'react';
import dayjs from 'dayjs';
import {
  getMultipleStoragePermission,
  getStoragePermission,
} from '../../services/permissions/storagePermission';
import {useNavigation} from '@react-navigation/native';
import {fileType} from './fileTypes';
import HeaderPath from './components/headerPath';
import EmptyFolder from './components/emptyFolder';
import ViewFiles from './components/files';
import RNFetchBlob from 'rn-fetch-blob';
import filesData from './folderStructure.json';
import {unzip} from 'react-native-zip-archive';
import FilesAsButton from './components/filesAsButton';
import ToastMsg from '../../components/toastMsg';

const EdocsScrn = () => {
  const {colors, sizes} = useDefaultTheme();
  const navigation = useNavigation();
  const [refreshPage, setrefreshPage] = useState(false);
  const android = RNFetchBlob.android;

  const [currentFolderPath, setcurrentFolderPath] = useState('');
  const [files, setFiles] = useState([]);

  const addFilesBySort = data => {
    let arrangedData = data;
    if (!arrangedData && arrangedData?.length < 1) return setFiles([]);
    arrangedData.sort(function (a, b) {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
    setFiles([...arrangedData].reverse());
  };

  const getFileContent = async path => {
    try {
      const reader = await RNFS.readDir(path);
      return reader;
    } catch (error) {
      console.log(error, 'error in getFileContent');
      throw {error: true, message: error};
    }
  };

  const getFolderContent = async path => {
    console.log(path);
    try {
      const allFiles = await RNFS.readDir(path);
      const jsonFile = allFiles.find(file => file.name.includes('.json'));
      if (!jsonFile) return;
      const fileData = await RNFS.readFile(jsonFile.path);
      const jsonData = JSON.parse(fileData);
      console.log(jsonData?.EDOCS?.Items?.Item, 'JsonDATA');
      setFiles(jsonData?.Items?.Item || jsonData?.EDOCS?.Items?.Item);
      setcurrentFolderPath(path);
      return;
    } catch (error) {
      ToastMsg(`${error}`);
      console.log(error, 'error in getFolderContent');
    }
  };

  const getSelectedPath = (index, folderName, handler = null) => {
    let sp = currentFolderPath.split('/');
    let indexIs = index + 1;
    if (handler === 'back') {
      indexIs = sp.length - 1;
      return;
    }
    if (indexIs !== sp.length) {
      sp.splice(-(sp.length - indexIs));
      const jo = sp.join('/');
      getFolderContent(jo);
      console.log(sp);
      return;
    }
  };

  const createFiles = async (customPath, path) => {
    try {
      const fileData = await RNFS.readFile(`${path + '/test.json'}`);

      const data = JSON.parse(fileData);
      if (data?.EDOCS?.Items?.Item) {
        data?.EDOCS?.Items?.Item.forEach(async itm => {
          await RNFS.mkdir(
            `${customPath}/${
              itm?.reference?.includes('.' || '/') ? itm.reference : itm.title
            }`,
          );
        });
        return;
      }
    } catch (error) {
      console.log(error, 'error in createFiles');
    }
  };

  const CheckDirectory = async path => {
    try {
      const customPath = path + '/Crew port/crewpoortfile-main/EDOCS';

      const folderExits = await RNFS.exists(
        path + '/Crew port/crewpoortfile-main/EDOCS',
      );
      if (folderExits) {
        getFolderContent(customPath);
      }
      console.log(folderExits, 'folderExits');
      setcurrentFolderPath(customPath);
      return;

      const reader = await getFileContent(path);
      const present = reader.find(file => file.name === 'Crew port');
      if (present) {
        const reader = await getFileContent(path);
        const exists = reader.find(file => file.name === 'Crew port');
        if (exists) {
          const reader = await getFileContent(customPath);
          // await createFiles(customPath + '/EDOCS', customPath);
          setFiles(reader);
        } else {
          await RNFS.mkdir(customPath);
          // await createFiles(customPath + '/EDOCS', customPath);
          setFiles([]);
        }
      } else {
        await RNFS.mkdir(customPath);
        setFiles([]);
      }
      setcurrentFolderPath(customPath);
      setrefreshPage(!refreshPage);
    } catch (error) {
      console.log(error, 'error in CheckDirectory');
    }
  };

  const unzipFile = path => {
    const sourcePath = path;
    const targetPath = currentFolderPath;
    const charset = 'UTF-8';
    unzip(sourcePath, targetPath, charset)
      .then(path => {
        console.log(`unzip completed at ${path}`);
        setrefreshPage(!refreshPage);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    (async () => {
      try {
        const granted = await getMultipleStoragePermission();
        if (granted) {
          await CheckDirectory(RNFS.DownloadDirectoryPath);
          return;
        }
        navigation.goBack();
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, []);

  useEffect(() => {
    if (currentFolderPath) {
      getFolderContent(currentFolderPath);
    }
  }, [refreshPage]);

  const FileView = ({item}) => {
    const onFileClick = async data => {
      if (!data?.reference) return ToastMsg('Folder is empty');
      const itemPath = currentFolderPath + '/' + data.reference;
      try {
        let ext = /[.]/.exec(itemPath) ? /[^.]+$/.exec(itemPath)[0] : undefined;

        if (ext && ext !== 'json') {
          console.log(ext, 'ext');
          console.log(itemPath, '-----itemPath-----');
          if (ext === 'pdf')
            // navigation.navigate('pdf', {filePath: itemPath});
            android.actionViewIntent(itemPath, 'application/pdf');
          if (ext === 'zip') unzipFile(itemPath);
          // android.actionViewIntent(itemPath, 'application/zip');
          if (['jpg ', 'png'].includes(ext))
            android.actionViewIntent(itemPath, 'image/jpg');
          if (ext === 'doc')
            android.actionViewIntent(itemPath, 'application/msword');
          if (ext === 'docx')
            android.actionViewIntent(
              itemPath,
              'application/vnd.openxmlformats',
            );
        }
        if (!ext || ext === 'json') {
          getFolderContent(
            currentFolderPath + '/' + data.reference.split('/')[0],
          );
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <FilesAsButton
        // newFile={newFilePath.split('/').includes(item?.name)}
        data={item}
        _onPress={data => onFileClick(data)}
      />
    );
  };

  return (
    <Block white flex={1}>
      <Block row align="center" padding={0}>
        <HeaderPath
          data={currentFolderPath}
          onPress={(index, item) => getSelectedPath(index, item)}
        />
      </Block>
      <Block padding={0} paddingVertical={sizes.s}>
        <FlatList
          data={files?.length > 0 ? files : []}
          renderItem={({item}) => <FileView item={item} />}
          keyExtractor={item => item.title}
          ListEmptyComponent={item => (
            <View>
              <Text>Empty</Text>
            </View>
          )}
        />
      </Block>
    </Block>
  );
};

export default EdocsScrn;

const styles = StyleSheet.create({
  arrowBox: {
    height: 0,
    width: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    position: 'relative',
  },
  startArrow: {
    borderLeftColor: 'transparent',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomColor: 'white',
  },
  endArrow: {
    borderLeftColor: 'gray',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    // left: -2,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  imgIcon: {
    width: 40,
    height: 40,
  },
});
