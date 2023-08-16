import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../../themes/const/colors';

const OrderDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  orderScreenView: {
    flex: 1,
    backgroundColor: colors.darkblue,
  },
  orderScreenView1: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingHorizontal: 20,

    paddingBottom: 15,
  },
  order: {
    marginBottom: 5,
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 15,
  },

  orderDetails: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
  },
  line: {
    marginVertical: 10,
  },
  orderDetails1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text: {
    color: colors.black,
    fontSize: 13,
  },
  textbottom: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderScreenItemView: {
    marginTop: 10,
  },
  itemstext: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inside: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: colors.grey,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  itemTExt: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  twotext: {
    fontSize: 14,
  },
  lasttext: {
    color: colors.black,
    fontSize: 14,
  },
  orderScreenBottom: {},
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
  MainView_Middle_Item: {
    marginTop: 10,
    backgroundColor: colors.fruitbbackground,
    padding: 10,
    borderRadius: 10,
  },
});
export default OrderDetailStyle;
