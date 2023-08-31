import {StyleSheet, Text as NativeText, View} from 'react-native';
import React from 'react';

import {Block, Button, Text, Icons} from '../../../components';
import useDefaultTheme from '../../../hooks/useDefaultTheme';
import dayjs from 'dayjs';
import {fileType} from '../fileTypes';

const ViewFiles = ({file, _onPress, fileExt, newFile}) => {
  const theme = useDefaultTheme();
  const fileData = file;
  return (
    <Button
      press
      row
      white
      alignItems="center"
      
      marginVertical
      paddingHorizontal={2}
      onPress={() => _onPress(fileData.path)}>
      <Icons
        iconName={fileType[fileExt]?.iconName || 'help'}
        color={theme.colors.primary}
        size={theme.sizes.l}
      />
      <Block padding={0} paddingHorizontal={theme.sizes.base} flex={1}>
        <Text p>{fileData.name}</Text>
        <Text gray>{`${dayjs(fileData.mtime).format('DD MMM YYYY')}`}</Text>
      </Block>
      {newFile && (
        <NativeText
          style={[
            styles.newIndicator,
            {
              color: theme.colors.white,
              fontWeight: 'bold',
              fontSize: 12,
              backgroundColor: theme.colors.danger,
            },
          ]}>
          New
        </NativeText>
      )}
      {fileExt?.type === 'folder' && (
        <Icons
          iconName="chevron-forward"
          color={theme.colors.gray}
          size={theme.sizes.sm}
        />
      )}
    </Button>
  );
};
export default ViewFiles;

const styles = StyleSheet.create({
  newIndicator: {
    fontSize: 12,
    paddingHorizontal: 7,
    color: 'white',
    paddingVertical: 1,
    borderRadius: 5,
    position: 'absolute',
    left: 9,
    top: -2,
  },
});
