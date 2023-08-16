import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../themes/const/colors';
import {CustomText} from '../../components/text';
import {Image} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {getAllOrders, getCartData} from '../../../database/sql';
import {useSelector} from 'react-redux';

const Order_info = ({onClickNavigate}) => {
  const [data, setData] = useState([]);
  const apiReducer = useSelector(state => state.userReducer);

  async function getData() {
    var myOrderData = [];
    let cartIds;

    var cartData = await getAllOrders();
    var rows = cartData.rows;
    var orders = rows.length;
    var orderData = [];

    for (let i = 0; i < orders; i++) {
      let orderDetails;
      let myCartData = [];

      var item = rows.item(i);

      orderDetails = item;
      cartIds = item?.items?.split(',');
      orderData = cartIds;
      var orderCartData = await getCartData(item.items);
      var cartRows = orderCartData.rows;
      for (let i = 0; i < cartRows.length; i++) {
        var cartItems = cartRows.item(i);
        apiReducer?.data.filter(Itemdetails => {
          if (Itemdetails.id == cartItems.item_id) {
            Itemdetails.quantity = cartItems.quantity;
            myCartData.push(Itemdetails);
          }
        });
      }
      myOrderData.push({
        orderInfo: orderDetails,
        items: orderData,
        data: myCartData,
      });

      setData(myOrderData);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onClickNavigate(item)}
              style={{
                backgroundColor: colors.fruitbbackground,
                marginBottom: 20,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CustomText text={`Order ID ${item?.orderInfo?.orderID}`} />
                <CustomText
                  textStyle={styles.totaltext}
                  text={`Total $${item?.orderInfo?.subTotal}`}
                />
              </View>
              <CustomText text={`items ${item.items.length}`} />
              <FlatList
                data={item?.data}
                horizontal
                showsHorizontalScrollIndicator={false}
                bouncesZoom={false}
                bounces={false}
                renderItem={({item}) => {
                  // console.log(item, 'item?.dat');
                  return (
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        paddingTop: 10,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}></View>
                      <View
                        style={{
                          backgroundColor: 'white',
                          borderRadius: 30,
                          padding: 5,
                        }}>
                        <Image
                          style={{height: 50, width: 50}}
                          resizeMode="contain"
                          source={{uri: item?.image_url}}></Image>
                      </View>

                      <CustomText text={item?.title} />
                      <CustomText text={`${item.quantity}Kg`} />
                    </View>
                  );
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Order_info;

const styles = StyleSheet.create({
  totaltext: {
    fontWeight: 'bold',
    color: colors.darkblue,
  },
});
