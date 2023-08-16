import {StyleSheet} from 'react-native';
import colors from '../../../../themes/const/colors';

const FavouriteScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue,
  },
  searchInput: {
    color: colors.black,
    fontSize: 16,
    backgroundColor: colors.fruitbbackground,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  middleView: {
    flex: 1.2,
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingHorizontal: 10,
    paddingBottom: 9,
  },
});

export default FavouriteScreenStyle;
