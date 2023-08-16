import {StyleSheet} from 'react-native';

import colors from '../../../../themes/const/colors';
import sizes from '../../../../themes/sizes';

const getStartedStyle = StyleSheet.create({
  foodBackground: {
    height: '60%',
    width: '100%',
  },
  imgBack: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
  },
  secondView: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: sizes.HORIZONTAL_SPACE,
  },
  textview1: {
    marginTop: 60,
    marginBottom: 10,
  },
  text1: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.white,
  },
  textview2: {
    alignItems: 'center',
  },
  text2: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.white,
  },
  btnstyle1: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
export default getStartedStyle;
