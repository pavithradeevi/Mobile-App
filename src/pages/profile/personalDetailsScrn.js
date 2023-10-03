import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Block from '../../components/block';
import Text from '../../components/text';
import useTheme from '../../hooks/useTheme';
import PageHeader from '../../components/pageHeader';
import {useDispatch, useSelector} from 'react-redux';
import {addPersonalDetailsReducer} from '../../redux/slices/profileSlice';

const PersonalDetailsScrn = () => {
  const Dispatch = useDispatch();
  const {colors} = useTheme();
  const {auth, profile} = useSelector(state => state);
  const [personalDetails, setpersonalDetails] = useState();

  // console.log(profile?.data?.personal);
  useEffect(() => {
    Dispatch(addPersonalDetailsReducer(auth?.data?.userName));
  }, []);

  useEffect(() => {
    let profileData = profile?.data?.personal || null;
    if (profileData) {
      delete profileData.id;
      delete profileData.modifiedDate;
      delete profileData.createdDate;
      setpersonalDetails(Object.entries(profileData));
    }
  }, [profile]);
  
  return (
    <Block container white padding>
      <PageHeader>
        <Text h5>My personal details</Text>
      </PageHeader>
      <Text></Text>
      <Block scroll>
        {personalDetails &&
          personalDetails?.map((item, idx) => (
            <Block
              key={idx}
              padding
              margin
              style={[styles.card, {borderColor: colors.gray}]}>
              <Text p gary capitalize>
                {item[0].replace(/[A-Z]/g, ' $&').trim()}
              </Text>
              <Text h5 black>
                {item[1]}
              </Text>
            </Block>
          ))}
      </Block>
    </Block>
  );
};

export default PersonalDetailsScrn;

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 0.5,
  },
});
