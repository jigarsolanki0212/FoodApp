import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import colors from '../themes/const/colors';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  getFavouriteitem,
  insertfavoriteitem,
  updateFavitem,
} from '../database/sql';
import {Rating} from 'react-native-ratings';

const CustomView = ({info, onPressImg, refreshData, onPressCart}) => {
  return (
    <View style={styles.imgView}>
      <View style={styles.imgInside}>
        <TouchableOpacity onPress={() => onPressImg(info)}>
          <Image
            style={styles.imageThumbnail}
            resizeMode="contain"
            source={{uri: info?.image_url}}
          />
        </TouchableOpacity>
        <View style={styles.imgdetails}>
          <Text style={styles.title}>{info?.title}</Text>

          <Rating
            tintColor={colors.fruitbbackground}
            fractions={true}
            startingValue={info?.rating}
            readonly
            type="custom"
            ratingBackgroundColor={colors.grey}
            imageSize={14}
            style={{
              width: '50%',
              padding: 2,
              marginLeft: -2,
              borderWidth: 0,
            }}
          />
        </View>
      </View>
      <View style={styles.FirstView}>
        <Text style={styles.dailytext}>${info?.price}/kg</Text>
        <TouchableOpacity onPress={()=>onPressCart(info)} style={styles.cartIconView}>
          <Icon style={styles.HeartIconstyle} name={'cart-outline'} />
        </TouchableOpacity>
        <View style={styles.iconView}>
          <TouchableOpacity
            onPress={async () => {
              var favItems = await getFavouriteitem(info.id);

              var rows = favItems.rows;
              if (rows.length > 0) {
                for (i = 0; i < rows.length; i++) {
                  var item = rows.item(i);
                  if (item.status == 0) {
                    await updateFavitem(1, item.id);
                  } else {
                    await updateFavitem(0, item.id);
                  }
                }
              } else {
                await insertfavoriteitem(info.id, 1);
              }
              refreshData();
            }}
            style={styles.iconView}>
            <Icon
              style={styles.HeartIconstyle}
              name={!info?.isFavourite ? 'ios-heart' : 'ios-heart'}
              color={!info?.isFavourite ? 'white' : 'red'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgView: {
    height: 230,

    width: '45%',

    backgroundColor: colors.fruitbbackground,

    borderWidth: 1,
    borderColor: colors.grey,
    justifyContent: 'space-between',
    margin: 10,
    borderRadius: 12,
    paddingTop: 15,
  },
  imgInside: {
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  imageThumbnail: {
    height: 100,
    width: 100,
  },
  imgdetails: {
    paddingLeft: 18,

    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  FirstView: {
    flexDirection: 'row',
   
    alignSelf:'flex-end',
  },
  iconView: {
    flexDirection: 'row',
    backgroundColor:'green',
  },
  dailytext: {
    flex:1,
    fontSize: 12,
    color: colors.black,
    paddingLeft: 19,

  },
  iconView: {
    backgroundColor: colors.lightpink,
    borderBottomEndRadius: 12,
   
  },
  HeartIconstyle: {
    fontSize: 24,
    padding: 4,
  },
  cartIconView: {
    backgroundColor: colors.lightpink,
    marginRight: 8,
  },
});

export default CustomView;
