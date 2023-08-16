import {Text, View, SafeAreaView, StatusBar, FlatList} from 'react-native';
import React, {useState} from 'react';
import MyCastScreenStyle from './style/MyCastScreenStyle';
import TopViewCustCompo from '../../components/TopViewCustCompo';
import strings from '../../../themes/const/strings';
import colors from '../../../themes/const/colors';
import {CustomText} from '../../components/text';
import Button from '../../components/button';
import {
  deleteItemFromCart,
  getAllCartItem,
  updateCart,
} from '../../../database/sql';
import {useFocusEffect} from '@react-navigation/native';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import value from '../../../themes/const/values';
import CustProductCart from '../../components/CustProductCart';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

const MyCartScren = ({navigation}) => {
  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState();
  const [total, setTotal] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [badgeValue, setbadgeValue] = useState();
  const apiReducer = useSelector(state => state.userReducer);

  async function getAllCart() {
    var cartData = await getAllCartItem();
    var rows = cartData.rows;

    var myCartData = [];
    var cartItems = [];
    for (var i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      var cart = apiReducer?.data?.find(fruit => {
        return fruit.id == item.item_id;
      });
      console.log(item, 'cart');
      cart.quantity = item.quantity;
      cart.cart_id = item.id;
      cartItems.push(cart);
      myCartData.push(cart);
    }

    setbadgeValue(cartItems.length);

    var result = myCartData
      .map(item => item.price * item.quantity)
      .reduce((acc, value) => acc + value, 0);

    var totalValue = result + value.DELIVERY_FEE;
    var total = (totalValue * (100 - value.DISCOUNT)) / 100;
    var discount = totalValue - total;
    setTotal(total.toFixed(2));
    setCartTotal(result.toFixed(2));
    setDiscountPrice(discount.toFixed(2));
    setCartData(myCartData);
  }
  useFocusEffect(
    React.useCallback(() => {
      getAllCart();
    }, [badgeValue]),
  );

  const onPressClick = info => {
    navigation.navigate('DetailScreen', {info});
  };

  const onPressGo = () => {
    navigation.navigate('Checkout', {cartData, cartTotal, total});
  };

  function CallToast(title) {
    Toast.show(`${title} is removed from cart`, Toast.SHORT, {
      color: colors.darkblue,
      fontSize: 20,
      fontWeight: 'bold',
    });
  }
  return (
    <SafeAreaView style={MyCastScreenStyle.container}>
      <StatusBar backgroundColor={colors.darkblue} />

      <TopViewCustCompo
        isShowBackIcon={false}
        MiddleTextName={strings.CART_SCREENAME}
        IconNameRight={'shopping'}
        isShowRightIcon={true}
        isShowBadge={true}
        value={badgeValue}
      />
      {cartData.length > 0 ? (
        <>
          <View style={MyCastScreenStyle.cartScreenView}>
            <View style={MyCastScreenStyle.cartScreenView1}>
              <View style={MyCastScreenStyle.middleView}>
                <FlatList
                  data={cartData}
                  numColumns={1}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <CustProductCart
                      item={item}
                      onPressDelIcon={async () => {
                        await deleteItemFromCart(0, item.id);
                        CallToast(item.title);
                        getAllCart();
                      }}
                      onPressImg={() => onPressClick(item)}
                      onPressMinus={async () => {
                        console.log(item.quantity, '  quantiti');

                        if (item.quantity > 0) {
                          await updateCart(item.quantity - 1, item.id);
                          getAllCart();
                        }
                      }}
                      onPressPlus={async () => {
                        await updateCart(item.quantity + 1, item.id);
                        getAllCart();
                      }}
                    />
                  )}
                />
              </View>
              <View style={MyCastScreenStyle.orderInfo}>
                <CustomText
                  textStyle={MyCastScreenStyle.orderText}
                  text={strings.ORDER_INFO}
                />
                <View style={MyCastScreenStyle.orderDetailsView}>
                  <View style={MyCastScreenStyle.orderDetails}>
                    <View style={MyCastScreenStyle.orderDetailsItem}>
                      <CustomText
                        textStyle={MyCastScreenStyle.billField}
                        text={strings.SUB_TOTAL}
                      />
                      <CustomText
                        textStyle={MyCastScreenStyle.billField}
                        text={strings.DELIVERY_FEE}
                      />
                      <CustomText
                        textStyle={MyCastScreenStyle.billField}
                        text={strings.DISCOUNT}
                      />
                    </View>
                    <View style={MyCastScreenStyle.orderDetailsItem}>
                      <CustomText
                        textStyle={MyCastScreenStyle.billtext}
                        text={'$' + cartTotal}
                      />
                      <CustomText
                        textStyle={MyCastScreenStyle.billtext}
                        text={'$' + value.DELIVERY_FEE}
                      />
                      <CustomText
                        textStyle={MyCastScreenStyle.billtext}
                        text={'$' + discountPrice}
                      />
                    </View>
                  </View>
                  <View style={MyCastScreenStyle.LineView}>
                    <Divider
                      insetType="middle"
                      style={{width: '90%', height: '5%'}}
                      color="black"
                      orientation="horizontal"
                    />
                  </View>
                  <View style={MyCastScreenStyle.totaltotal}>
                    <CustomText
                      textStyle={MyCastScreenStyle.billtext}
                      text={strings.TOTAL}
                    />
                    <CustomText
                      textStyle={MyCastScreenStyle.billtext}
                      text={'$' + total}
                    />
                  </View>
                </View>
                <Button
                  onPress={() => onPressGo()}
                  btntextColor={colors.white}
                  bgColor={colors.darkblue}
                  butnstyl={MyCastScreenStyle.Checkoutbtn}
                  title={strings.CHECK_OUT}></Button>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: colors.black, fontWeight: 'bold'}}>
            No data found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyCartScren;
