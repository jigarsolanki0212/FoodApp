import {View, SafeAreaView, StatusBar, Keyboard, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../../themes/const/colors';
import Input from '../../components/input';
import Button from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Buffer} from 'buffer';
import {
  CustomText,
  CustomTextCheckbox,
  CustomeTopView,
} from '../../components/text';

import strings from '../../../themes/const/strings';
import LoginStyle from './styles/LoginStyle';

import Loader from '../../components/loader';
import {getUserData} from '../../../database/sql';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    if (!email) {
      handleError('Please input email', 'email');
      return false;
    }
    if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      return false;
    }
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      )
    ) {
      handleError(
        'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:',
        'password',
      );
      return false;
    }
    if (!isSelected) {
      Alert.alert(' Please confirm terms & conditions');
      return false;
    }
    login();
  };

  const decryptionPass = password => {
    return Buffer.from(password, 'base64').toString('utf8');
  };

  const login = async () => {
    setLoading(true);
    var userdatavalid = await getUserData(email);
    var rows = userdatavalid.rows;
    if (rows.length == 0) {
      Alert.alert('Please register yourself first');
    } else {
      for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        var decreptedPass = decryptionPass(item.password);
        console.log(decreptedPass, 'decryptionPass');

        if (decreptedPass === password) {
          navigation.replace('MainScreen');
          await AsyncStorage.setItem('userid', item.user_id + '');
          break;
        } else {
          handleError('password is not valid', 'password');
        }
      }
    }
    setLoading(false);
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const onPress = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.darkblue, flex: 1}}>
      <Loader visible={loading} />
      <StatusBar backgroundColor={colors.darkblue}></StatusBar>
      <CustomeTopView textName={strings.LOGIN} />
      <View style={LoginStyle.loginView}>
        <CustomText
          textviewstyl={LoginStyle.welcomeTextView}
          textStyle={LoginStyle.welcomeText}
          text={strings.WELCOME_BACK}
        />
        <CustomText
          textviewstyl={LoginStyle.continueTextView}
          textStyle={LoginStyle.continueText}
          text={strings.COUNTINUE_TO_SIGN_IN}
        />
        <Input
          iconName="email-outline"
          label="Email"
          placeholder="Enter your email address"
          onChangeText={text => setEmail(text)}
          onFocus={() => handleError(null, 'email')}
          error={errors.email}
          email
        />
        <Input
          iconName="lock-outline"
          label="Password"
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
          onFocus={() => handleError(null, 'password')}
          error={errors.password}
          password
        />
        <CustomText
          textStyle={LoginStyle.forgotpass}
          text={strings.FORGET_PASS}
        />

        <CustomTextCheckbox
          disabled={false}
          value={isSelected}
          onValueChange={setSelection}
          textviewstyl={LoginStyle.checkboxview}
          text={strings.REMEMBER}
        />
        <Button
          bgColor={colors.darkblue}
          btntextColor={colors.white}
          title={strings.LOGIN}
          onPress={validate}
        />
        <CustomText
          textStyle={LoginStyle.noaccount}
          text={strings.NOACCOUNT_REGISTER}
        />
        <CustomText
          onPress={onPress}
          textStyle={LoginStyle.register}
          text={strings.REGISTER}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
