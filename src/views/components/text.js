import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../../themes/const/colors';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';

export const CustomText = ({text, textviewstyl, textStyle, onPress}) => {
  return (
    <View style={(styles.textview, textviewstyl)}>
      <Text onPress={onPress} style={[styles.textstyl, textStyle]}>
        {text}
      </Text>
    </View>
  );
};
export const LableText = ({lable, lableviewstyl, lableStyle}) => {
  return (
    <View style={(styles.lable, lableviewstyl)}>
      <Text style={[styles.lablestyle, lableStyle]}>{lable}</Text>
    </View>
  );
};
export const SimpleCheckText = ({
  text,

  textStyle,
  viewText,
  value,
  onPress,
  checkstyle,
}) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={
          ({
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          },
          viewText)
        }>
        <CheckBox
          tintColors={{true: colors.darkblue, false: colors.darkblue}}
          value={value}
          onValueChange={onPress}
          style={checkstyle}
        />
        <Text style={[styles.textstyl, textStyle]}>{text}</Text>
      </View>
    </View>
  );
};

export const CustomTextCheckbox = ({
  startText,
  termscondition,
  and,
  text,
  privacypolicy,
  textviewstyl,
  textStyle,
  onPress,
  onPressPrivacy,
  value,
  onValueChange,
}) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={[styles.TextCheckView, textviewstyl]}>
        <CheckBox
          tintColors={{true: colors.darkblue, false: colors.darkblue}}
          value={value}
          onValueChange={onValueChange}
          style={{color: 'yellow'}}
        />
        <Text style={[styles.textstyl, textStyle]}>
          {text}
          <Text style={{color: colors.black}}>{startText}</Text>
          <Text style={{color: 'blue', fontWeight: 'bold'}} onPress={onPress}>
            {termscondition}
          </Text>
          <Text style={{color: colors.black}}>{and}</Text>
          <Text
            style={{color: 'blue', fontWeight: 'bold'}}
            onPress={onPressPrivacy}>
            {privacypolicy}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export const CustomeTopView = ({
  TopViewStyle,
  textName,
  backIconSignup,
  onPress,
}) => {
  return (
    <View style={[styles.topView, TopViewStyle]}>
      {backIconSignup && (
        <TouchableOpacity onPress={onPress}>
          <Icon name={'arrow-back'} style={[styles.backIconstyle]} />
        </TouchableOpacity>
      )}

      <Text style={styles.topviewtext}>{textName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lable: {},
  lablestyle: {
    color: colors.black,
    paddingHorizontal: 16,
    padding: 8,
    fontSize: 18,
  },

  textview: {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyl: {
    paddingVertical: 2,
    fontSize: 14,
  },
  TextCheckView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topView: {
    flex: 0.4,
    flexDirection: 'row',
    backgroundColor: colors.darkblue,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  topviewtext: {
    flex: 1,
    paddingRight: 25,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: sizes.TOPVIEW_Middle_TEXT,
  },
  backIconstyle: {
    fontWeight: 'bold',
    borderWidth: 0.2,
    borderColor: 'white',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 7,
    color: colors.white,
    fontSize: 22,
  },
});
