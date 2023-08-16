import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../../themes/const/colors';
import HomeScreenStyle from './style/HomeScreenStyle';
import strings from '../../../themes/const/strings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomView from '../../../MockData/CustomView';
import {
  getAllFavitem,
  getCartItem,
  insertCartOrActive,
} from '../../../database/sql';
import Loader from '../../components/loader';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {callData} from '../../../api';

import {apiFinish, apiStart} from '../../../../FoodRedux/actions/apiAction';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState('All');
  const [updatedData, setUpdatedData] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const apiReducer = useSelector(state => state.userReducer);

  useEffect(() => {
    fruitData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (apiReducer?.data?.length > 0) {
        getData();
      }
    }, [apiReducer?.data]),
  );
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [selectedId]),
  );

  const fruitData = async () => {
    if (apiReducer?.data == 0) {
      dispatch(apiStart());
      let fruits = await callData();
      var dataOfCategories = fruits.map(item => {
        return item.Categories;
      });
      dataOfCategories.push('All');
      const uniqueCategories = [...new Set(dataOfCategories.sort())];

      dispatch(apiFinish({fruits, uniqueCategories}));
    }
  };

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[HomeScreenStyle.item, {backgroundColor}]}>
      <Text style={[HomeScreenStyle.title, {color: textColor}]}>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor =
      item === selectedId ? colors.darkblue : colors.fruitbbackground;
    const color = item === selectedId ? colors.white : colors.darkblue;

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  async function getData() {
    setLoading(true);
    var favdata = await getAllFavitem();
    var rows = favdata.rows;
    var mydata = [];
    for (i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      mydata.push(item.item_id + '');
    }
    console.log('my data', mydata);
    var unique = [];
    if (selectedId == 'All') {
      console.log('object');
      unique = apiReducer?.data;
    } else {
      console.log('method');

      unique = apiReducer?.data.filter(item => {
        return item?.Categories == selectedId;
      });
    }

    console.log('unique', unique);

    var newData = unique.map(item => {
      if (mydata.indexOf(item.id) >= 0) {
        item.isFavourite = true;
      } else {
        item.isFavourite = false;
      }
      return item;
    });
    setUpdatedData(newData);
    setLoading(false);
  }

  function OnPressRefresh() {
    getData();
  }
  const onPress = () => {
    navigation.openDrawer();
  };
  const onPressClick = info => {
    navigation.navigate('DetailScreen', {info});
  };

  function CallToast(title) {
    Toast.show(`${title} is already in cart`, Toast.SHORT, {
      color: colors.darkblue,
      fontSize: 20,
      fontWeight: 'bold',
    });
  }
  function AddedCartToast(title) {
    Toast.show(`${title} added to the cart`, Toast.SHORT, {
      color: colors.darkblue,
      fontSize: 20,
      fontWeight: 'bold',
    });
  }

  async function addTocart(mockdata) {
    if (mockdata.outOfStock == false) {
      var cartItems = await getCartItem(mockdata.id);
      var rows = cartItems.rows;

      if (rows.length > 0) {
        console.log('rowlenght > 0');
        for (i = 0; i < rows.length; i++) {
          var item = rows.item(i);

          if (item.active == 0) {
            console.log('item.active == 0');

            await insertCartOrActive(item.item_id, item.quantity + 1);
            AddedCartToast(mockdata.title);
          } else {
            console.log('item already in cart');

            CallToast(mockdata.title);
          }
        }
      } else {
        console.log(mockdata.id, 1, 'item inserrt rows.length <0');
        await insertCartOrActive(mockdata.id, 1);
        AddedCartToast(mockdata.title);
      }
    } else {
      Toast.show(`${mockdata.title} is out of stock`, Toast.CENTER, {
        color: colors.darkblue,
        fontSize: 20,
        fontWeight: 'bold',
      });
    }
  }

  return (
    <SafeAreaView style={HomeScreenStyle.MainContainer}>
      <StatusBar backgroundColor={colors.white}></StatusBar>
      <View style={HomeScreenStyle.mainView}>
        <View style={HomeScreenStyle.FirstView}>
          <Text
            style={
              HomeScreenStyle.dailytext
            }>{`${strings.DAILY_GROCERY}\n${strings.GROCERY}`}</Text>
          <TouchableOpacity style={HomeScreenStyle.iconView} onPress={onPress}>
            <Icon name="menu" style={HomeScreenStyle.iconstyle} />
          </TouchableOpacity>
        </View>
        <View style={HomeScreenStyle.SecondView}>
          <FlatList
            data={apiReducer?.categories}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            extraData={selectedId}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={HomeScreenStyle.customViewStyle}>
          <Loader visible={loading} />
          <FlatList
            data={updatedData}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              // if (selectedId != 'All' && item.Categories != selectedId) {
              //   return;
              // }
              return (
                <CustomView
                  info={item}
                  onPressImg={onPressClick}
                  refreshData={OnPressRefresh}
                  onPressCart={addTocart}
                />
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
