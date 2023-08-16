import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopViewCustCompo from '../../components/TopViewCustCompo';
import CheckoutStyle from './style/CheckoutStyle';
import colors from '../../../themes/const/colors';
import strings from '../../../themes/const/strings';
import {CustomText} from '../../components/text';
import {PaymentMethod} from '../../../MockData/fruitList';
import {SimpleCheckText} from '../../components/text';
import Button from '../../components/button';
import Custome_Modal from '../../components/cust_modal/Custome_Modal';
import {
  getAddressOfUser,
  getDataOfUser,
  insertOrder,
  updateCartOnPlaceOrder,
} from '../../../database/sql';
import AsyncStorage from '@react-native-async-storage/async-storage';

import value from '../../../themes/const/values';
import Modal_place_order from '../../components/cust_modal/Modal_place_order';
import {useFocusEffect} from '@react-navigation/native';

const Checkout = ({visible, navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedPayment, setSelectedPayment] = useState();
  const [userAddress, setUserAddress] = useState([]);
  const [cartItems, setCartItems] = useState();
  const [cartItemId, setCartItemId] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    cart();
    getUserData();
  }, []);

  // useEffect(() => {
  //   getUserAddress();
  // }, [userAddress.length]);

  useEffect(() => {
    getUserAddress();
  }, [userAddress]);

  function OnPressRefresh() {
    getUserAddress();
  }
  const getUserData = async () => {
    const user = await AsyncStorage.getItem('userid');
    var datafromID = await getDataOfUser(user);
    var rows = datafromID.rows;
    if (rows.length == 0) {
      console.log('no data found');
    } else {
      var item = rows.item(0);
      // console.log(item, 'data of user');
      setUserDetails(item);
    }
  };

  const cart = async () => {
    var items = route.params.cartData.map(item => {
      // console.log(item.id, 'items of data');
      return item.cart_id;
    });
    setCartItemId(items);
    setCartItems(items.toString());
  };

  const validate = async () => {
    // console.log(selectedId, 'address');
    // console.log(selectedPayment, 'payment');

    if (selectedId == null) {
      Alert.alert('please Select any one address');
      return false;
    }

    if (selectedPayment == null) {
      Alert.alert('please Select any one payment');
      return false;
    }

    await onPlaceOrder();
    setModalShow(true);
  };

  const onPlaceOrder = async () => {
    await insertOrder(
      cartItems,
      selectedId,
      selectedPayment,
      route.params.cartTotal,
      value.DELIVERY_FEE,
      userDetails.fullname,
    );

    var items = route.params.cartData.map(async item => {
      await updateCartOnPlaceOrder(item.cart_id);
    });
  };
  const getUserAddress = async () => {
    const user = await AsyncStorage.getItem('userid');
    var datafromID = await getAddressOfUser(user);
    var rows = datafromID.rows;
    var userAdd = [];
    var dataLength = rows.length;
    if (dataLength == 0) {
      console.log('no data found');
    } else {
      for (let i = 0; i < dataLength; i++) {
        var item = rows.item(i);

        userAdd.push(item);
        // console.log(userAdd);
      }
      setUserAddress(userAdd);
      // onPress();
    }
  };

  const renderItem = ({item}) => {
    let isSelected = false;

    if (selectedId == null) {
      isSelected = item.default == 'true' ? true : false;
      isSelected == true && setSelectedId(item.address_id);
    } else {
      isSelected = item.address_id === selectedId;
    }

    return (
      <View
        style={CheckoutStyle.MainView_Middle_Item(
          isSelected ? colors.darkblue : colors.white,
        )}>
        <SimpleCheckText
          value={isSelected}
          onPress={() => setSelectedId(isSelected ? null : item.address_id)}
          textStyle={CheckoutStyle.checkText}
          viewText={CheckoutStyle.MainView_Middle_Item_Top}
          text={item.address_type}
        />

        <CustomText
          textviewstyl={{paddingHorizontal: 32}}
          textStyle={{color: isSelected ? colors.black : null}}
          text={`${item.address_line_1}, ${item.city}, ${item.zip}`}
        />
      </View>
    );
  };

  const renderPayments = ({item}) => {
    const isSelected = item.type === selectedPayment;
    return (
      <View style={CheckoutStyle.MainView_MiddleBottom_Item}>
        <SimpleCheckText
          value={isSelected}
          onPress={() => setSelectedPayment(isSelected ? null : item.type)}
          textStyle={CheckoutStyle.checkText}
          viewText={CheckoutStyle.MainView_Middle_Item_Top}
        />

        <Image
          style={CheckoutStyle.paymentimg}
          source={item?.icon}
          resizeMode="contain"
        />
        <CustomText textStyle={CheckoutStyle.paymentText} text={item.type} />
      </View>
    );
  };
  return (
    <SafeAreaView style={CheckoutStyle.container}>
      <StatusBar backgroundColor={colors.darkblue} />
      {modalVisible && (
        <Custome_Modal
          onPress={OnPressRefresh}
          setModalVisible={setModalVisible}
        />
      )}

      {modalShow && (
        <Modal
          animationType="fade"
          visible={visible}
          transparent={true}
          onRequestClose={() => {
            setModalShow(false);
          }}>
          <Modal_place_order
            setModalShow={setModalShow}
            onPress={() => {
              setModalShow(false);
              navigation.pop();
            }}
          />
        </Modal>
      )}

      <TopViewCustCompo
        onPress={() => navigation.pop()}
        isShowBlueHeader={true}
        isShowBackIcon={true}
        MiddleTextName={strings.CHECKOUT}
      />
      <View style={CheckoutStyle.MainView}>
        <View style={CheckoutStyle.MainView_Top}>
          <CustomText
            textStyle={CheckoutStyle.mainViewTopText}
            text={'Delivery address'}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <CustomText text={'Add New'} />
          </TouchableOpacity>
        </View>
        <View style={CheckoutStyle.MainView_Middle}>
          <FlatList
            data={userAddress}
            keyExtractor={item => item.address_id}
            renderItem={renderItem}
          />
        </View>

        <View style={CheckoutStyle.MainView_MiddleBottom}>
          <View style={CheckoutStyle.MainView_MiddleBottom_Top}>
            <CustomText
              textStyle={CheckoutStyle.mainViewTopText}
              text={'Payment Method'}
            />
          </View>
          <View style={CheckoutStyle.MainView_MiddleBottom_Middle}>
            <FlatList
              data={PaymentMethod}
              keyExtractor={item => item.id}
              renderItem={renderPayments}
            />
          </View>

          <View style={CheckoutStyle.MainView_MiddleBottom_Bottom}>
            <CustomText
              textStyle={CheckoutStyle.bottomAmount}
              text={`Total ${route.params.total}`}
            />
            <Button
              onPress={async () => {
                validate();
              }}
              btntextColor={colors.white}
              butnstyl={{marginTop: 10}}
              bgColor={colors.darkblue}
              title={'Place Order'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;
