import {StyleSheet} from 'react-native';
import colors from '../../../../themes/const/colors';

const HomeScreenStyle = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.darkblue,
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingHorizontal: 10,
  },
  FirstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  dailytext: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.darkblue,
  },
  iconstyle: {
    fontSize: 22,
    paddingVertical: 16,
    paddingHorizontal: 7,
    fontWeight: 'bold',
    color: colors.black,
  },
  iconView: {
    borderWidth: 0.8,
    borderColor: colors.grey,
    borderRadius: 18,
  },
  SecondView: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  FilterListView: {
    paddingVertical: 6,
    borderRadius: 20,
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 20,

    alignItems: 'center',
    borderRadius: 18,
    marginVertical: 3,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 15,
  },
  customViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingBottom: 9,
  },
});

export default HomeScreenStyle;
