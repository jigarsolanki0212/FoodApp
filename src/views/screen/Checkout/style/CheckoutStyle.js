import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../../themes/const/colors';

export default CheckoutStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue,
    paddingTop: 10,
  },

  MainView: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 10,
  },
  MainView_Top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainViewTopText: {
    color: colors.darkblue,
    fontWeight: 'bold',
    fontSize: 18,
  },
  MainView_Middle: {
    flex: 1,
    marginTop: 10,
  },
  MainView_Middle_Item: border => ({
    backgroundColor: colors.fruitbbackground,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: border,
  }),
  MainView_Middle_Item_Top: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.darkblue,
  },
  checkText: {
    color: colors.darkblue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  MainView_MiddleBottom: {
    flex: 1.4,
  },
  MainView_MiddleBottom_Middle: {
    marginTop: 5,
  },
  MainView_MiddleBottom_Item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.fruitbbackground,
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
  },
  paymentimg: {
    height: 35,
    width: 35,
  },
  paymentText: {
    marginHorizontal: 10,
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomAmount: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.black,
    fontSize: 16,
  },
});
