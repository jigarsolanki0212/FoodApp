import {View, Text, SafeAreaView, StatusBar, Image} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import TopViewCustCompo from '../../components/TopViewCustCompo';
import colors from '../../../themes/const/colors';
import strings from '../../../themes/const/strings';
import DetailScreenStyle from './style/DetailScreenStyle';
import {TouchableOpacity} from 'react-native';
import {
  getCartItem,
  getFavouriteitem,
  insertCartItem,
  insertCartOrActive,
  insertfavoriteitem,
  updateCart,
  updateFavitem,
} from '../../../database/sql';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const DetailScreen = ({navigation, route}) => {
  const [quantity, setQuantity] = useState(0);
  const [favStatus, setfavStatus] = useState();
  const [inStock, setInStock] = useState();

  useEffect(() => {
    setInStock(route.params.info.outOfStock);
    fetchData();
  }, [quantity]);

  useFocusEffect(
    useCallback(() => {
      getFav();
    }, []),
  );

  function favoriteToast(title) {
    Toast.show(`${title} set to favorite.`, Toast.SHORT, {
      color: colors.darkblue,
      fontSize: 20,
      fontWeight: 'bold',
    });
  }
  function unfavoriteToast(title) {
    Toast.show(`${title} set to unfavorite.`, Toast.SHORT, {
      color: colors.darkblue,
      fontSize: 20,
      fontWeight: 'bold',
    });
  }

  async function fav() {
    var favItems = await getFavouriteitem(route.params.info.id);
    var rows = favItems.rows;
    if (rows.length > 0) {
      for (i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        if (item.status == 0) {
          await updateFavitem(1, item.id);
          favoriteToast(route.params.info.title);
        } else {
          await updateFavitem(0, item.id);
          unfavoriteToast(route.params.info.title);
        }
      }
    } else {
      await insertfavoriteitem(route.params.info?.id, 1);
    }
    getFav();
  }

  async function getFav() {
    var favFruit = await getFavouriteitem(route.params.info.id);
    var rows = favFruit.rows;
    if (rows.length > 0) {
      for (i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        setfavStatus(item.status);
      }
    }
  }

  async function fetchData() {
    var cartQuantitydata = await getCartItem(route.params.info.id);
    var rows = cartQuantitydata.rows;
    for (i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      setQuantity(item?.quantity);
    }
  }

  useEffect(() => {
    if (quantity > 0) {
      cartItem();
    }
  }, [quantity]);

  async function cartItem() {
    console.log(route.params.info.outOfStock);
    if (route.params.info.outOfStock == false) {
      var cartItems = await getCartItem(route.params.info.id);
      var rows = cartItems.rows;

      if (rows.length > 0) {
        for (i = 0; i < rows.length; i++) {
          var item = rows.item(i);

          await updateCart(quantity, item.item_id);
          if (quantity == 0) {
            deleteItemToast();
          }
        }
      } else {
        await insertCartOrActive(route.params.info.id, quantity);
      }
    }
  }
  async function addToCart() {
    console.log(route.params.info.outOfStock);
    if (route.params.info.outOfStock == false) {
      if (quantity > 0) {
        setQuantity(quantity + 1);
        UpdateToast();
      } else {
        setQuantity(quantity + 1);
        CallToast();
      }
    } else {
      Toast.show(`${route.params.info.title} is out of stock`, Toast.CENTER, {
        color: colors.darkblue,
        fontSize: 20,
        fontWeight: 'bold',
      });
    }
  }
  async function removeFromCart(id) {
    console.log(quantity, 'itemid');
    if (quantity > 0) {
      await updateCart(quantity - 1, id);
      // cartItem();
      if (quantity > 1) {
        removeToast();
      }
    }

    // if (quantity > 0) {
    //   setQuantity(quantity - 1);
    //   if (quantity > 1) {
    //     removeToast();
    //   }
    // }
  }

  const onPressBack = () => {
    navigation.pop();
  };

  function deleteItemToast() {
    Toast.show(`${route.params.info.title} removed from cart.`, Toast.SHORT, {
      color: colors.darkblue,
      fontSize: 20,
      fontWeight: 'bold',
    });
  }
  function CallToast() {
    Toast.show(`${route.params.info.title} added to the cart.`, Toast.SHORT, {
      color: colors.darkblue,
      fontSize: 20,
      fontWeight: 'bold',
    });
  }
  function UpdateToast() {
    Toast.show(
      ` increase quantity of ${route.params.info.title}.`,
      Toast.SHORT,
      {
        color: colors.darkblue,
        fontSize: 20,
        fontWeight: 'bold',
      },
    );
  }
  function removeToast() {
    Toast.show(
      ` decrease quantity of ${route.params.info.title}.`,
      Toast.SHORT,
      {
        color: colors.darkblue,
        fontSize: 20,
        fontWeight: 'bold',
      },
    );
  }
  return (
    <SafeAreaView style={DetailScreenStyle.container}>
      <StatusBar backgroundColor={colors.darkblue} />
      <TopViewCustCompo
        onPress={onPressBack}
        isShowBlueHeader={true}
        isShowBackIcon={true}
        MiddleTextName={strings.DETAILS_SCREENAME}
        OnPressFav={() => {
          fav();
        }}
        IconNameRight={!favStatus ? 'heart-outline' : 'heart'}
        isShowRightIcon={true}
      />
      <View style={DetailScreenStyle.SecondView}>
        <View style={DetailScreenStyle.imgView}>
          <Image
            style={DetailScreenStyle.FavImg}
            source={{
              uri: route.params.info.image_url,
            }}></Image>
        </View>
        <View style={DetailScreenStyle.imgdetails}>
          <View style={DetailScreenStyle.imgdatainside}>
            <View>
              <Text style={DetailScreenStyle.title}>
                {route.params.info?.title}
              </Text>

              {inStock ? (
                <Text style={DetailScreenStyle.outofstock}>out of stock</Text>
              ) : (
                <Text style={DetailScreenStyle.available}>
                  {strings.AVAILABLE_STOCK}
                </Text>
              )}
            </View>
            {quantity > 0 ? (
              <View style={DetailScreenStyle.btnstyle}>
                <TouchableOpacity
                  onPress={() => removeFromCart(route.params.info?.id)}
                  style={DetailScreenStyle.minusStyle}>
                  <Text style={DetailScreenStyle.minustext}>-</Text>
                </TouchableOpacity>
                <Text style={DetailScreenStyle.Value}>{quantity} kg</Text>
                <TouchableOpacity
                  onPress={() => {
                    addToCart();
                  }}
                  style={DetailScreenStyle.plusStyle}>
                  <Text style={DetailScreenStyle.plustext}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={addToCart}
                style={DetailScreenStyle.addToCartView}>
                <Text style={DetailScreenStyle.addToCart}>+ Add to cart</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <Text style={DetailScreenStyle.title}>Description</Text>
            <Text style={DetailScreenStyle.downtext}>
              {route.params.info?.description}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
