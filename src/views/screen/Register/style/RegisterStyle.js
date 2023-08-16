import {StyleSheet} from 'react-native';
import colors from '../../../../themes/const/colors';
import sizes from '../../../../themes/sizes';

const RegisterStyle = StyleSheet.create({
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
    paddingTop: 10,
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
    marginBottom: 10,
  },
  checkboxview: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 6,
  },
  noaccount: {
    marginTop: 10,
    textAlign: 'center',
    color: colors?.lightGrey,
  },
  register: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.darkblue,
  },
  scrollstyle: {
    marginBottom: 20,
  },
});

export default RegisterStyle;
