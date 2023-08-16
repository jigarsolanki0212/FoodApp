import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { selectedData} from './fruitList';
import colors from '../themes/const/colors';
import Swipeout from 'react-native-swipeout';

const CartItems = ({ viewstyle }) => {
  const [count, setCount] = useState(0);
  var swipeoutBtns = [
    {
      text: 'Button',
      backgroundColor: colors.lightpink,
      color:'red',
    },
  ];
  return (
    <FlatList
      data={selectedData}
      renderItem={({item}) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            borderWidth: 0.2,
            borderColor: colors.darkblue,
            paddingVertical: 5,
            borderRadius: 10,
            margin: 10,
            viewstyle,
          }}>
          <Swipeout
            buttonWidth={60}
            Close={true}
            backgroundColor="white"
            right={swipeoutBtns}>
            <View style={styles.imgView}>
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
              <View style={styles.cartbtn}>
                <TouchableOpacity
                  onPress={() => {
                    setCount(count - 1);
                  }}>
                  <Text style={styles.minussign}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.textname}>{count}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setCount(count + 1);
                  }}>
                  <Text style={styles.plussign}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Swipeout>
        </View>
      )}
      numColumns={1}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CartItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingBottom: 5,
    borderRadius: 5,
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
});
