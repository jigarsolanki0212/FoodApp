import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../../themes/const/colors';
import strings from '../../../../themes/const/strings';
import sizes from '../../../../themes/sizes';

const ProfileScreenStyle = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: sizes.HORIZONTAL_SPACE,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  topText: {
    color: colors.darkblue,
    fontWeight: 'bold',
    fontSize: 23,
    borderWidth: 0.2,
    borderColor: 'grey',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 7,
  },
  profilename: {
    color: colors.darkblue,
    fontWeight: 'bold',
    fontSize: 23,
  },

  profileView: {
    flex: 0.4,
    marginTop: 50,
    backgroundColor: colors.darkblue,
    borderRadius: 10,
  },
  addressView: {
  
   
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    marginBottom:20,
  },
  addressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  
  },
  emailView: {
    flex: 0.2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  emailTop: {
   
   
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProfileScreenStyle;
