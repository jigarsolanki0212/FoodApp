import {View, SafeAreaView, StatusBar, Keyboard, Alert} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../themes/const/colors';
import strings from '../../../themes/const/strings';
import {
  CustomText,
  CustomTextCheckbox,
  CustomeTopView,
} from '../../components/text';
import Input from '../../components/input';
import RegisterStyle from './style/RegisterStyle';
import Button from '../../components/button';
import {ScrollView} from 'react-native-gesture-handler';
import {insertUserData} from '../../../database/sql';
import Loader from '../../components/loader';

const RegisterScreen = ({navigation}) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const onPress = () => {
    navigation.navigate('LoginScreen');
  };

  const validate = () => {
    Keyboard.dismiss();

    if (!fullname) {
      handleError('Please input fullname', 'fullname');
      return false;
    }
    if (!fullname.match(/^[a-zA-Z ]+$/)) {
      handleError('Please input a valid fullname', 'fullname');
      return false;
    }
    if (!email) {
      handleError('Please input email', 'email');
      return false;
    }
    if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      return false;
    }
    if (!password) {
      handleError('Please input password', 'password');
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
    if (!confirmPass) {
      handleError('Please input password', 'confirmPass');
      return false;
    }
    if (confirmPass !== password) {
      handleError('Please confirm password', 'confirmPass');
      return false;
    }
    if (!isSelected) {
      Alert.alert(' Please confirm terms & conditions');
      return false;
    }

    register();
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const register = async () => {
    // console.log(`${fullname}----${email}----${password}`);

    setLoading(true);
    await insertUserData(fullname, email, password);

    try {
      navigation.replace('LoginScreen');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={{backgroundColor: colors.darkblue, flex: 1}}>
      <Loader visible={loading} />
      <StatusBar backgroundColor={colors.darkblue}></StatusBar>

      <CustomeTopView
        backIconSignup
        onPress={() => {
          navigation.pop();
        }}
        textName={strings.REGISTER}
      />

      <View style={RegisterStyle.loginView}>
        <CustomText
          textviewstyl={RegisterStyle.welcomeTextView}
          textStyle={RegisterStyle.welcomeText}
          text={strings.WELCOME_BACK}
        />
        <CustomText
          textviewstyl={RegisterStyle.continueTextView}
          textStyle={RegisterStyle.continueText}
          text={strings.COUNTINUE_TO_SIGN_UP}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={RegisterStyle.scrollstyle}>
          <Input
            label="Name"
            placeholder="Enter your name"
            placeholderTextColor={colors.lightGrey}
            onChangeText={text => setFullname(text)}
            onFocus={() => handleError(null, 'fullname')}
            error={errors.fullname}
            TrueIcon
          />
          <Input
            label="Email"
            placeholder="Enter your email address"
            onChangeText={text => setEmail(text)}
            onFocus={() => handleError(null, 'email')}
            error={errors.email}
            TrueIcon
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            onChangeText={text => setPassword(text)}
            onFocus={() => handleError(null, 'password')}
            error={errors.password}
            password
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            onChangeText={text => setconfirmPass(text)}
            onFocus={() => handleError(null, 'confirmPass')}
            error={errors.confirmPass}
            password
          />
          <CustomTextCheckbox
            value={isSelected}
            onValueChange={setSelection}
            textviewstyl={RegisterStyle.checkboxview}
            startText={strings.CHECK_START}
            onPress={() => {
              Alert.alert(strings.TERMS_AND_CONDITIONS);
            }}
            termscondition={strings.CHECK_TERMS}
            and={strings.CHECK_AND}
            onPressPrivacy={() => {
              Alert.alert(strings.TERMS_AND_CONDITIONS);
            }}
            privacypolicy={strings.CHECK_PRIVACY}
          />
          <Button
            onPress={validate}
            bgColor={colors.darkblue}
            btntextColor={colors.white}
            title={strings.REGISTER}
          />
          <CustomText
            textStyle={RegisterStyle.noaccount}
            text={strings.NOACCOUNT_REGISTER}
          />
          <CustomText
            onPress={onPress}
            textStyle={RegisterStyle.register}
            text={strings.LOGIN}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
