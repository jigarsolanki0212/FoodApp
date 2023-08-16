import {View, SafeAreaView, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import Button from '../../components/button';
import colors from '../../../themes/const/colors';
import getStartedStyle from './styles/getStartedStyle';
import {CustomText} from '../../components/text';
import strings from '../../../themes/const/strings';
import {createTable} from '../../../database/sql';

const GetStarted = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('LoginScreen');
  };
  useEffect(() => {
    createTable();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.darkblue, flex: 1}}>
      <StatusBar backgroundColor={colors.white}></StatusBar>

      <View style={getStartedStyle.imgBack}>
        <Image
          resizeMode="cover"
          style={getStartedStyle.foodBackground}
          source={require('../../../assets/images/foodBack.png')}
        />
      </View>
      <View style={getStartedStyle.secondView}>
        <CustomText
          textviewstyl={getStartedStyle.textview1}
          textStyle={getStartedStyle.text1}
          text={strings.SHOP_DAILY_GROCERY}
        />
        <CustomText
          textviewstyl={getStartedStyle.textview2}
          textStyle={getStartedStyle.text2}
          text={strings.THE_EASIEST_WAY}></CustomText>
        <Button
          onPress={onPress}
          btntextColor={colors.darkblue}
          bgColor={colors.white}
          butnstyl={getStartedStyle.btnstyle1}
          title={strings.GET_STARTED}></Button>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
