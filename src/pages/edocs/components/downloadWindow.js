import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import * as RNFS from 'react-native-fs';

import {Button, Block, Text, Icons} from '../../../components';
import useDefaultTheme from '../../../hooks/useDefaultTheme';
import {useState} from 'react';
import {testLinks} from '../mokdata';
import {Downloader} from '../../../services/downloader/downloader';
import RenderIf from '../../../components/renderIf';

const downloadFiles = [
  {
    fileName: 'Download pdf',
    downloadLink: testLinks.pdf,
    fileType: 'pdf',
    downloadPath: 'Crew port/crewpoortfile-main/EDOCS/ADMIN',
  },
  {
    fileName: 'Download Image',
    downloadLink: testLinks.image,
    fileType: 'image',
    downloadPath: 'Crew port/crewpoortfile-main/EDOCS/FLIGHT_OPS/AFM/NP',
  },
  {
    fileName: 'Download DOC',
    downloadLink: testLinks.word,
    fileType: 'doc',
    downloadPath: 'Crew port/crewpoortfile-main/EDOCS/FLIGHT_OPS',
  },
];

const DownloadWindow = ({rootPath}) => {
  const {sizes, colors} = useDefaultTheme();
  const [showModal, setshowModal] = useState(false);

  const RenderItem = ({item}) => {
    const [downloading, setdownloading] = useState(false);
    const [dwnCompleted, setdwnCompleted] = useState(false);

    const downloadFun = async () => {
      const dwnPath = rootPath + '/' + item.downloadPath;
      try {
        const pathExits = await RNFS.exists(dwnPath);
        if (!pathExits) {
          await RNFS.mkdir(dwnPath);
        }
        setdownloading(true);
        let done = await Downloader({
          downloadLink: item.downloadLink,
          downloadPath: dwnPath,
        });
        setdownloading(!done);
        console.log(done);
      } catch (error) {
        console.log(error, 'error in downloadFun');
      }
    };

    return (
      <Button
        white
        row
        alignItem="center"
        flex
        radius
        justifyContent="space-between"
        marginVertical
        paddingHorizontal
        onPress={() => downloadFun()}>
        <Block padding={0}>
          <Text p>{item.fileName}</Text>
        </Block>
        <Block padding={0} row alignItem="center">
          {/* <Text gray>10%</Text> */}
          <RenderIf isTrue={downloading}>
            <ActivityIndicator animating={true} color={colors.primary} />
          </RenderIf>
          <RenderIf isTrue={!downloading}>
            <Icons
              iconName={
                dwnCompleted
                  ? 'checkmark-circle-outline'
                  : 'arrow-down-circle-outline'
              }
              color={colors.primary}
              size={sizes.m}
            />
          </RenderIf>
          <RenderIf isTrue={false}>
            <Icons
              iconName={'close-circle-outline'}
              color={colors.primary}
              size={sizes.m}
            />
          </RenderIf>
        </Block>
      </Button>
    );
  };
  return (
    <>
      <Modal visible={showModal} transparent={true}>
        <Block flex={1} justifyContent="flex-end" style={styles.container}>
          <Block
            white
            borderRadius
            flex={1}
            primary
            paddingBottom={sizes.l}
            style={[styles.listBox, {bottom: sizes.sm, right: sizes.sm}]}>
            <Text h5 white>
              Downloads files
            </Text>
            <Text></Text>
            <FlatList
              data={downloadFiles}
              renderItem={({item}) => <RenderItem item={item} />}
            />
          </Block>
          <Button
            primary
            activeOpacity={1}
            width={sizes.l}
            height={sizes.l}
            radius={sizes.xl}
            onPress={() => setshowModal(!showModal)}
            style={[styles.dwnBtn, {bottom: sizes.sm, right: sizes.sm}]}>
            <Icons iconName={'close'} color={colors.white} size={sizes.m} />
          </Button>
        </Block>
      </Modal>
      <Button
        primary
        radius={sizes.xl}
        width={sizes.l}
        height={sizes.l}
        padding={0}
        center
        onPress={() => setshowModal(!showModal)}
        style={[styles.dwnBtn, {bottom: sizes.sm, right: sizes.sm}]}>
        <Icons iconName={'arrow-down'} color={colors.white} size={sizes.m} />
        <Text white style={styles.count}>
          {`${downloadFiles.length}`}
        </Text>
      </Button>
    </>
  );
};

export default DownloadWindow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(100,100,100,0.5)',
  },
  listBox: {
    position: 'absolute',
    minWidth: 320,
  },
  dwnBtn: {
    position: 'absolute',
  },
  count: {
    position: 'absolute',
    paddingHorizontal: 5,
    right: 0,
    top: -2,
    textAlign: 'center',
    backgroundColor: 'red',
    borderRadius: 50,
  },
});
