import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import colors from '../../themes/const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
  label,
  iconName,
  error,
  TrueIcon,
  password,
  inputView,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={({marginBottom: 10}, inputView)}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? colors.red
              : isFocused
              ? colors.darkblue
              : colors.lightblue,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            borderWidth: 1,
          },
        ]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: colors.black, flex: 1, fontSize: 16}}
          {...props}
        />
        {TrueIcon && (
          <Icon name={'check'} style={{color: colors.darkblue, fontSize: 20}} />
        )}

        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye' : 'eye-off'}
            style={{color: colors.darkblue, fontSize: 20}}
          />
        )}
      </View>
      {error && (
        <Text
          style={{
            marginTop: 4,
            marginLeft: 2,
            color: colors.red,
            fontSize: 10,
            fontWeight: '500',
          }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 2,
    fontSize: 14,
    color: colors.darkblue,
    paddingHorizontal: 2,
    marginTop: 0,
  },
  inputContainer: {
    height: 45,
    borderWidth: 1,
    backgroundColor: colors.lightblue,
    flexDirection: 'row',
    marginVertical:5,
    paddingHorizontal: 4,
    paddingRight: 5,
    borderWidth: 0.5,
    borderRadius: 10,
  },
});

export default Input;
