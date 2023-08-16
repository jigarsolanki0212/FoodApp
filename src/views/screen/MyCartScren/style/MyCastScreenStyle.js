import {StyleSheet} from 'react-native';
import colors from '../../../../themes/const/colors';

const MyCastScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cartScreenView: {
    flex: 1,
    backgroundColor: colors.darkblue,
  },
  cartScreenView1: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  middleView: {
    flex: 0.8,
    paddingHorizontal: 10,
  },
  topText: {
    color: colors.darkblue,
    fontWeight: 'bold',
  },

  orderInfo: {
    flex: 0.6,
    backgroundColor: colors.fruitbbackground,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginHorizontal: 10,
    paddingTop: 10,
    marginBottom: 20,
  },
  orderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
    color: colors.black,
    fontSize: 16,
  },
  orderDetailsView: {
    flexDirection: 'row',
  },
  orderDetails: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  orderDetailsItem: {
    gap: 5,
  },
  billField: {
    color: colors.black,
    fontSize: 13,
  },
  billtext: {
    textAlign: 'right',
    color: colors.black,
    fontSize: 13,
  },
  orderDetailsView: {
    flexDirection: 'column',
  },
  Checkoutbtn: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  LineView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
  },
  totaltotal: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
});

export default MyCastScreenStyle;
