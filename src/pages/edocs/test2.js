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
import {Downloader} from '../../services/downloader/downloader';
import {testLinks} from './mokdata';
import DownloadWindow from './components/downloadWindow';

const EdocsScrn = () => {
  const {colors, sizes} = useDefaultTheme();
  const navigation = useNavigation();
  const android = RNFetchBlob.android;

  const [currentFolderPath, setcurrentFolderPath] = useState('');
  const [refreshPage, setrefreshPage] = useState(false);
  const [rootPath, setrootPath] = useState('');
  const [files, setFiles] = useState([]);

  const getFolderContent = async path => {
    console.log(path);
    // alert(path)
    try {
      const allFiles = await RNFS.readDir(path);
      console.log(allFiles);
      setFiles(allFiles);
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

  const CheckDirectory = async path => {
    try {
      const appFolderPath = path + '/Crew port';
      const dataFolderPath = appFolderPath + '/crewpoortfile-main/EDOCS';

      let appFolderExits = await RNFS.exists(appFolderPath);
      let dataFolderExits = await RNFS.exists(dataFolderPath);
      if (dataFolderExits) {
        setcurrentFolderPath(dataFolderPath);
        getFolderContent(dataFolderPath);
        return;
      }
      if (appFolderExits) {
        setcurrentFolderPath(appFolderPath);
        getFolderContent(appFolderPath);
        return;
      }
      await RNFS.mkdir(appFolderPath);
      setcurrentFolderPath(appFolderPath);
      return;
    } catch (error) {
      console.log(error, 'error in CheckDirectory');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const granted = await getMultipleStoragePermission();
        if (!granted) return navigation.goBack();
        await CheckDirectory(RNFS.DownloadDirectoryPath);
        setrootPath(RNFS.DownloadDirectoryPath);
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
    let fileExt = /[.]/.exec(item.path)
      ? /[^.]+$/.exec(item.path)[0]
      : 'folder';

    const onFileClick = async data => {
      const itemPath = item.path;
      try {
        if (fileExt === 'folder') getFolderContent(itemPath);
        if (fileExt === 'pdf')
          android.actionViewIntent(itemPath, 'application/pdf');
        if (fileExt === 'zip') unzipFile(itemPath);
        if (fileExt === 'doc')
          android.actionViewIntent(itemPath, 'application/msword');
        if (['jpg ', 'png'].includes(fileExt))
          android.actionViewIntent(itemPath, 'image/jpg');
        if (fileExt === 'docx')
          android.actionViewIntent(itemPath, 'application/vnd.openxmlformats');
        if (!fileExt || fileExt === 'json') {
          getFolderContent(
            currentFolderPath + '/' + data.reference.split('/')[0],
          );
          // navigation.navigate('pdf', {filePath: itemPath});
          // android.actionViewIntent(itemPath, 'application/zip');
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (['json', 'xml'].includes(fileExt)) {
      return;
    }
    return (
      <ViewFiles
        // newFile={newFilePath.split('/').includes(item?.name)}
        fileExt={fileExt}
        file={item}
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
          keyExtractor={item => item.name}
          ListEmptyComponent={item => (
            <View>
              <Text>Empty</Text>
            </View>
          )}
        />
      </Block>
      {files?.length < 1 && (
        <Block center flex={1}>
          <Button
            primary
            onPress={() =>
              Downloader({
                downloadLink: testLinks.github,
                downloadPath: currentFolderPath,
              })
            }>
            <Text white>Download File</Text>
          </Button>
        </Block>
      )}
      <DownloadWindow rootPath={rootPath} />
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
