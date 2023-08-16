import colors from '../../../../themes/const/colors';
import {StyleSheet} from 'react-native';
import sizes from '../../../../themes/sizes';
const LoginStyle = StyleSheet.create({
  topView: {
    flex: 0.4,
    backgroundColor: colors.darkblue,
    justifyContent: 'center',
  },
  signinText: {
    textAlign: 'center',
    fontSize: 22,
    color: colors.white,
  },
  loginView: {
    flex: 2.2,
    backgroundColor: colors.white,
    paddingTop: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: sizes.HORIZONTAL_SPACE,
  },
  welcomeTextView: {},
  welcomeText: {
    fontSize: 22,
    color: colors.darkblue,
    fontWeight: 'bold',
    padding: 0,
  },
  continueText: {
    fontSize: 20,
    color: colors.darkblue,
    padding: 0,
    marginBottom: 20,
  },
  forgotpass: {
    textAlign: 'right',
    marginTop: 10,
  },

  noaccount: {
    marginTop: 20,
    textAlign: 'center',
  },
  register: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.darkblue,
  },
  checkboxview: {
    alignSelf: 'flex-start',
    flex: 0,
    marginBottom: 5,
  },
});
export default LoginStyle;
