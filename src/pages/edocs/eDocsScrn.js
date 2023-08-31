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
    try {
      setcurrentFolderPath(path);
      const reader = await RNFS.readDir(path);
      console.log(JSON.stringify(reader, null, 2));
      addFilesBySort(reader);
      return reader;
    } catch (error) {
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
      const customPath = path + '/Crew port';

      const reader = await getFileContent(path);
      const present = reader.find(file => file.name === 'Crew port');
      if (present) {
        const reader = await getFileContent(path);
        const exists = reader.find(file => file.name === 'Crew port');
        if (exists) {
          const reader = await getFileContent(customPath);
          await createFiles(customPath + '/EDOCS', customPath);
          addFilesBySort(reader);
        } else {
          await RNFS.mkdir(customPath);
          await createFiles(customPath + '/EDOCS', customPath);
          addFilesBySort([]);
        }
      } else {
        await RNFS.mkdir(customPath);
        addFilesBySort([]);
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

          // console.log(
          //   JSON.stringify(
          //     await RNFS.readDir(RNFS.DocumentDirectoryPath),
          //     null,
          //     2,
          //   ),
          // );
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
    const fileArray = item?.name.split('.');
    const newFilePath =
      '/storage/emulated/0/Download/Crew port/EDOCS/ABC/images.jpeg';
    let fileTypeIs;
    if (fileArray?.length <= 1) {
      fileTypeIs = fileType['folder'];
    } else {
      fileTypeIs = fileType[fileArray.pop()] || fileType['unknow'];
    }

    const onFileClick = async data => {
      try {
        if (fileTypeIs?.type === 'folder') getFolderContent(data);
        if (fileTypeIs?.type === 'pdf')
          navigation.navigate('pdf', {filePath: data});
        // android.actionViewIntent(data, 'application/pdf');
        if (fileTypeIs?.type === 'zip') unzipFile(data);
        // android.actionViewIntent(data, 'application/zip');
        if (fileTypeIs?.type === 'image')
          android.actionViewIntent(data, 'image/jpg');
        if (fileTypeIs?.type === 'doc')
          android.actionViewIntent(data, 'application/msword');
        if (fileTypeIs?.type === 'docx')
          android.actionViewIntent(data, 'application/vnd.openxmlformats');
        if (fileTypeIs?.type === 'json')
          // android.actionViewIntent(data, 'application/json');
          navigation.navigate('json', {filePath: data});
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <ViewFiles
        newFile={newFilePath.split('/').includes(item?.name)}
        fileTypeIs={fileTypeIs}
        data={item}
        _onPress={data => onFileClick(data)}
      />
    );
  };

  return (
    <Block white flex>
      <Block row align="center">
        <HeaderPath
          data={currentFolderPath}
          onPress={(index, item) => getSelectedPath(index, item)}
        />
      </Block>
      <Block paddingVertical={sizes.s}>
        <FlatList
          data={files?.length > 0 ? files : []}
          renderItem={({item}) => <FileView item={item} />}
          keyExtractor={item => item.name}
          ListEmptyComponent={item => (
            <EmptyFolder
              item={currentFolderPath}
              onDownloaded={() => setrefreshPage(!refreshPage)}
            />
          )}
        />
      </Block>
      {/* <EmptyFolder item={currentFolderPath} /> */}
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
