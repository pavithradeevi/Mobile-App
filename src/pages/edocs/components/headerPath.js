import { StyleSheet, View } from 'react-native';
import React from 'react';

import { Block, Button, Text, Icons } from '../../../components';
import useDefaultTheme from '../../../hooks/useDefaultTheme';

const HeaderPath = ({ data, onPress }) => {
  const { sizes, colors } = useDefaultTheme();
  console.log(data, '----------HeaderPath data-----------------');
  // alert(data)

  // Custom wrapper component for row-wise wrapping
  const RowWrap = ({ children }) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{children}</View>
  );

  return (
    <Block padding={0} scroll horizontal={true}>
      <RowWrap>
        {data?.split('/').map((item, idx) => {
          if (idx < 5) return null;
          return (
            <Button
              key={item}
              row
              alignItems="center"
              onPress={() => onPress(idx, item)}>
              {idx !== -1 && <View style={[styles.arrowBox, styles.endArrow]} />}
              <Icons iconName="chevron-forward" size={sizes.smallIcon} />
              <Text paddingHorizontal={5} style={{ backgroundColor: 'white' }}>
                {item}
              </Text>
            </Button>
          );
        })}
      </RowWrap>
    </Block>
  );
};

export default HeaderPath;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
