import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import colors from '../../themes/const/colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {SwipeRow} from 'react-native-swipe-list-view';
import sizes from '../../themes/sizes';

const CustProductCart = ({
  swiperow,
  onPressPlus,
  onPressMinus,
  onPressImg,
  onPressDelIcon,
  item,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        // borderWidth: 1,
        borderColor: colors.grey,

        borderRadius: sizes.CART_BORDER_RADIUS,
        margin: 5,
      }}>
      <SwipeRow rightOpenValue={-75} {...swiperow}>
        <View style={styles.standaloneRowBack}>
          <TouchableOpacity style={{padding: 20}}>
            <Icon
              onPress={onPressDelIcon}
              style={styles.backTextWhite}
              name="delete"></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.imgView}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              onPressImg(item);
            }}>
            <View style={styles.imgInside}>
              <Image
                style={styles.imageThumbnail}
                source={{uri: item.image_url}}
              />
            </View>
            <View style={styles.productdetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.Categories}>{item.Categories}</Text>
              <Text style={styles.price}>${item.price}/kg</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.cartbtn}>
            <TouchableOpacity onPress={onPressMinus}>
              <Text style={styles.minussign}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.textname}>{item.quantity}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressPlus}>
              <Text style={styles.plussign}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SwipeRow>
    </View>
  );
};

export default CustProductCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    borderRadius: sizes.CART_BORDER_RADIUS,
    backgroundColor: colors.fruitbbackground,
  },
  imgInside: {
    backgroundColor: colors.fruitbbackground,
    alignItems: 'center',
  },
  imageThumbnail: {
    height: 70,
    width: 70,
  },
  productdetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkblue,
  },
  Categories: {
    fontSize: 12,
    color: colors.darkblue,
  },
  price: {
    fontSize: 14,
    color: colors.darkblue,
    fontWeight: 'bold',
  },
  cartbtn: {
    flexDirection: 'column',
    backgroundColor: colors.darkblue,
    paddingHorizontal: 15,
    // paddingBottom: 5,
    borderRadius: 5,
    marginRight: 5,
    marginVertical: 10,
  },
  textname: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  minussign: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  plussign: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  standaloneRowBack: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: sizes.CART_BORDER_RADIUS,
    backgroundColor: colors.fruitbbackground,
    alignItems: 'center',

    justifyContent: 'flex-end',
  },
  backTextWhite: {
    color: 'red',
    fontSize: 50,
    fontWeight: 'bold',
  },
});
