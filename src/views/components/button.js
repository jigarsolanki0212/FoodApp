import React from 'react';
import {TouchableOpacity,View, Text} from 'react-native';
const Button = ({
  title,
  bgColor,
  btntextColor,
  butnstyl,
  onPress,
}) => {
  return (
    <View style={butnstyl}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 80,
          backgroundColor: bgColor,
          borderRadius: 11,
        }}>
        <Text style={{color: btntextColor, fontWeight: 'bold', fontSize: 20}}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
