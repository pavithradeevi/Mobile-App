import {StyleSheet, View} from 'react-native';
import React from 'react';
import * as RNFS from 'react-native-fs';

import {Block, Button, Text, Icons} from '../../../components';
import useDefaultTheme from '../../../hooks/useDefaultTheme';
import {Downloader} from '../../../services/downloader/downloader';
import {testLinks} from '../mokdata';
import jsonData from '../folderStructure.json';

const AddFilesToEmptyFolder = props => {
  const {sizes, colors} = useDefaultTheme();
  console.log(props.item);

  const writeFile = () => {
    RNFS.writeFile(
      props.item + '/test.json',
      `${JSON.stringify(jsonData, null, 2)}`,
      'utf8',
    )
      .then(success => {
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  return (
    <Block center flex={1} height={500}>
      <Block>
        <Text>Download Files to test</Text>
      </Block>
      <Button
        light
        onPress={() =>
          Downloader({downloadLink: testLinks.image, downloadPath: props.item})
        }>
        <Text gray> image file</Text>
      </Button>
      <Text></Text>
      <Button
        light
        onPress={() =>
          Downloader({downloadLink: testLinks.pdf, downloadPath: props.item})
        }>
        <Text gray> pdf file</Text>
      </Button>
      <Text></Text>
      <Button
        light
        onPress={() =>
          Downloader({downloadLink: testLinks.github, downloadPath: props.item})
        }>
        <Text gray> zip file</Text>
      </Button>
      <Text></Text>
      <Button
        light
        onPress={() => {
          Downloader({downloadLink: testLinks.word, downloadPath: props.item});
          props.onDownloaded();
        }}>
        <Text gray> doc file</Text>
      </Button>
      <Text></Text>
      <Button light onPress={() => writeFile()}>
        <Text gray>Json file</Text>
      </Button>
    </Block>
  );
};
const EmptyFolderView = props => {
  const {sizes, colors} = useDefaultTheme();
  console.log(props.item);
  return (
    <Block center flex={1} height={200}>
      <Icons
        iconName="folder-open-outline"
        color={colors.light}
        size={sizes.l}
      />
      <Text p light>
        No files
      </Text>
    </Block>
  );
};
const EmptyFolder = props => {
  return (
    <Block>
      {/* <EmptyFolderView {...props} /> */}
      <AddFilesToEmptyFolder {...props} />
    </Block>
  );
};

export default EmptyFolder;

const styles = StyleSheet.create({});
