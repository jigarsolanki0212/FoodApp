import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';

import colors from '../../themes/const/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import sizes from '../../themes/sizes';
import {CustomText} from './text';
import {color} from 'react-native-reanimated';
import {Badge} from 'react-native-elements';

const TopViewCustCompo = ({
  isShowBlueHeader,
  isShowSearch,
  IconNameLeft,
  topTextStyle,
  MiddleTextName,
  IconNameRight,
  onPress,
  OnPressFav,
  isShowBackIcon,
  middleTextStyle,
  HeartColor,
  isShowBadge,
  isShowRightIcon,
  value,
}) => {
  return (
    <View
      style={[
        styles.topCustomView,
        {backgroundColor: isShowBlueHeader ? colors.darkblue : colors.white},
      ]}>
      <TouchableOpacity onPress={onPress}>
        {isShowBackIcon && (
          <Icon
            style={[styles.backIconstyle(isShowBlueHeader)]}
            name={isShowSearch ? 'search' : 'arrow-back'}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity>
        <CustomText
          textStyle={[styles.middleText(isShowBlueHeader)]}
          text={MiddleTextName}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={OnPressFav}>
        {isShowRightIcon && (
          <Icons
            style={[
              styles.heart(IconNameRight ? true : false, isShowBlueHeader),
              topTextStyle,
            ]}
            name={IconNameRight}
            color={isShowBlueHeader ? colors.white : colors.darkblue}
          />
        )}
        {isShowBadge && (
          <Badge
            containerStyle={{position: 'absolute', top: -4, right: -4}}
            value={value}
            status="primary"
            badgeStyle={{backgroundColor: colors.darkblue}}
            textStyle={{fontWeight: 'bold'}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TopViewCustCompo;

const styles = StyleSheet.create({
  topCustomView: {
    paddingVertical: sizes.HORIZONTAL_SPACE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  middleText: isShowBlueHeader => ({
    color: isShowBlueHeader ? colors.white : colors.darkblue,
    fontWeight: 'bold',
    fontSize: sizes.TOPVIEW_Middle_TEXT,
  }),
  backIconstyle: isShowBlueHeader => ({
    fontSize: 23,
    fontWeight: 'bold',
    color: isShowBlueHeader ? colors.white : colors.darkblue,
    borderWidth: 0.2,
    borderColor: isShowBlueHeader ? colors.white : colors.darkblue,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 7,
  }),
  heart: (isrightIconShow, isShowBlueHeader) => ({
    fontSize: 23,
    fontWeight: 'bold',
    borderWidth: isrightIconShow ? 0.2 : 0,
    borderColor: isShowBlueHeader ? colors.white : colors.darkblue,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 7,
  }),
});
