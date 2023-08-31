import {StyleSheet, Text as NativeText, View} from 'react-native';
import React from 'react';

import {Block, Button, Text, Icons} from '../../../components';
import useDefaultTheme from '../../../hooks/useDefaultTheme';
import dayjs from 'dayjs';

const FolderType = ({sizes, colors}) => {
  return (
    <Icons
      name="Ionicons"
      iconName={'folder-open'}
      color={colors.primary}
      size={sizes.l}
    />
  );
};

const FilesAsButton = ({data, _onPress, fileTypeIs, newFile}) => {
  const theme = useDefaultTheme();
  const {key, title, reference} = data;
  return (
    <Button
      press
      row
      white
      alignItems="center"
      marginVertical
      paddingHorizontal={2}
      onPress={() => _onPress(data)}>
      <FolderType {...theme} />
      <Block padding={0} paddingHorizontal={theme.sizes.base} flex={1}>
        <Text p>{title}</Text>
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
      {fileTypeIs?.type === 'folder' && (
        <Icons
          iconName="chevron-forward"
          color={theme.colors.gray}
          size={theme.sizes.sm}
        />
      )}
    </Button>
  );
};
export default FilesAsButton;

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
