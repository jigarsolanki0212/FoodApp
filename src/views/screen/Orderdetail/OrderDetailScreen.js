import {
  View,
  StatusBar,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderDetailStyle from './style/OrderDetailStyle';
import colors from '../../../themes/const/colors';
import TopViewCustCompo from '../../components/TopViewCustCompo';
import strings from '../../../themes/const/strings';
import {CustomText} from '../../components/text';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getOrderdAddress} from '../../../database/sql';

const OrderDetailScreen = ({navigation, route}) => {
  const [orderData, setOrderData] = useState();
  const [total, setTotal] = useState();
  const [userAddress, setUserAddress] = useState([]);

  useEffect(() => {
    setOrderData(route?.params?.orderDetails);
    // console.log(
    //   'route?.params?.orderDetails',
    //   route?.params?.orderDetails?.data,
    // );
  }, []);

  useEffect(() => {
    getTotal();
  }, [orderData]);

  async function getTotal() {
    var totalValue =
      orderData?.orderInfo?.subTotal + orderData?.orderInfo?.delivery_Fee;

    setTotal(totalValue.toFixed(2));

    let AddressInfo;
    let line1;
    let city;
    let zip;
    let addtype;
    var datafromID = await getOrderdAddress(
      route?.params?.orderDetails?.orderInfo?.address_id,
    );
    var rows = datafromID.rows;
    var dataLength = rows.length;
    if (dataLength == 0) {
      console.log('no data found');
    } else {
      for (let i = 0; i < dataLength; i++) {
        var item = rows.item(i);
        line1 = item.address_line_1;
        city = item.city;
        zip = item.zip;
        addtype = item.address_type;
      }

      AddressInfo = {
        address_line_1: line1,
        City: city,
        Zipcode: zip,
        Address_Type: addtype,
      };

      setUserAddress(AddressInfo);
    }
  }
  return (
    <SafeAreaView style={OrderDetailStyle.container}>
      <StatusBar backgroundColor={colors.darkblue} />

      <TopViewCustCompo
        onPress={() => navigation.pop()}
        isShowBackIcon={true}
        MiddleTextName={strings.ORDER_DETAIL}
      />
      <View style={OrderDetailStyle.orderScreenView}>
        <View style={OrderDetailStyle.orderScreenView1}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={OrderDetailStyle.orderDetails}>
              <CustomText
                textStyle={OrderDetailStyle.order}
                text={'Order Detail'}
              />
              <View style={OrderDetailStyle.orderDetails1}>
                <CustomText textStyle={OrderDetailStyle.text} text={'Name'} />
                <CustomText
                  textStyle={OrderDetailStyle.text}
                  text={orderData?.orderInfo?.userName}
                />
              </View>
              <View style={OrderDetailStyle.orderDetails1}>
                <CustomText
                  textStyle={OrderDetailStyle.text}
                  text={'Order id'}
                />
                <CustomText
                  textStyle={OrderDetailStyle.text}
                  text={orderData?.orderInfo?.orderID}
                />
              </View>
              <View style={OrderDetailStyle.orderDetails1}>
                <CustomText
                  textStyle={OrderDetailStyle.text}
                  text={'Payment Method '}
                />
                <CustomText
                  textStyle={OrderDetailStyle.text}
                  text={orderData?.orderInfo?.payment_type}
                />
              </View>
              <View style={OrderDetailStyle.orderDetails1}>
                <CustomText
                  textStyle={OrderDetailStyle.text}
                  text={'Sub total'}
                />
                <CustomText
                  textStyle={OrderDetailStyle.text}
                  text={`$${orderData?.orderInfo?.subTotal}`}
                />
              </View>
              <View style={OrderDetailStyle.orderDetails1}>
                <CustomText
                  textStyle={OrderDetailStyle.text}
                  text={'DeliveryFee'}
                />
                <CustomText
                  textStyle={OrderDetailStyle.text}
                  text={`$${orderData?.orderInfo?.delivery_Fee}`}
                />
              </View>
              <View style={OrderDetailStyle.line}>
                <Divider
                  style={{width: '100%'}}
                  color="black"
                  orientation="horizontal"
                />
              </View>
              <View style={OrderDetailStyle.orderDetails1}>
                <CustomText
                  textStyle={OrderDetailStyle.textbottom}
                  text={'Total'}
                />
                <CustomText
                  textStyle={OrderDetailStyle.textbottom}
                  text={`$${total}`}
                />
              </View>
            </View>
            <View style={OrderDetailStyle.orderScreenItemView}>
              <CustomText
                textStyle={OrderDetailStyle.itemstext}
                text={'Items'}
              />
              <View style={OrderDetailStyle.orderScreenItemView1}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={route?.params?.orderDetails?.data}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <View style={OrderDetailStyle.inside}>
                      <Image
                        resizeMode="contain"
                        style={{height: 70, width: 70, marginRight: 10}}
                        source={{uri: item.image_url}}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <CustomText
                          textStyle={OrderDetailStyle.itemTExt}
                          text={item.title}
                        />
                        <CustomText
                          textStyle={OrderDetailStyle.twotext}
                          text={item.Categories}
                        />
                        <CustomText
                          textStyle={OrderDetailStyle.twotext}
                          text={item.id}
                        />
                        <CustomText
                          textStyle={OrderDetailStyle.lasttext}
                          text={`$${item.price}/kg`}
                        />
                      </View>
                    </View>
                  )}
                />
              </View>
              <View style={OrderDetailStyle.orderScreenBottom}>
                <View style={OrderDetailStyle.MainView_Middle_Item}>
                  <CustomText
                    textStyle={OrderDetailStyle.mainViewTopText}
                    text={'Delivery address'}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Icon size={20} name="home" />
                    <CustomText
                      textStyle={{
                        paddingHorizontal: 12,
                        color: colors.black,
                        fontWeight: 'bold',
                      }}
                      text={userAddress?.Address_Type}
                    />
                  </View>
                  <CustomText
                    textviewstyl={{paddingHorizontal: 32}}
                    text={`${userAddress?.address_line_1}, ${userAddress?.City}, ${userAddress?.Zipcode}`}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetailScreen;
