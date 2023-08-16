import {StyleSheet} from 'react-native';
import colors from '../../../../themes/const/colors';

const DetailScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue,
  },
  topText: {
    color: colors.white,
  },
  SecondView: {
    flex: 1.3,
    backgroundColor: colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  imgView: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FavImg: {
    height: 200,
    width: 200,
  },
  imgdetails: {
    flexDirection: 'column',
  },
  imgdatainside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    paddingTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    paddingBottom: 10,
  },
  available: {
    fontSize: 16,
    color: colors.gray,
  },
  outofstock: {
    fontSize: 16,
    color: 'red',
  },
  Value: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  btnstyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusStyle: {
    backgroundColor: colors.darkblue,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minustext: {
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold',
  },
  plusStyle: {
    backgroundColor: colors.darkblue,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  plustext: {
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold',
  },
  addToCartView: {
    backgroundColor: colors.darkblue,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addToCart: {
    fontSize: 14,
    color: colors.white,
  },
});

export default DetailScreenStyle;
