import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../themes/const/colors';
import TopViewCustCompo from '../../components/TopViewCustCompo';
import FavouriteScreenStyle from './style/FavouriteScreenStyle';
import strings from '../../../themes/const/strings';
import CustomView from '../../../MockData/CustomView';
import {getAllFavitem} from '../../../database/sql';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import {Data} from '../../../MockData/fruitList';

const FavouriteScreen = ({navigation}) => {
  const [updatedata, setUpdateData] = useState();
  const apiReducer = useSelector(state => state.userReducer);
  const [show, setShow] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const onPressClick = info => {
    navigation.navigate('DetailScreen', {info});
  };

  async function favdata() {
    var favouriteData = await getAllFavitem();
    var rows = favouriteData.rows;
    var myFavdata = [];
    let details;
    // var cartItems = [];

    for (var i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      details = Data?.find(fruit => {
        return fruit.id == item.item_id;
      });
      details.isFavourite = true;
      myFavdata.push(details);
      // cartItems.push(item.item_id);
    }
    setUpdateData(myFavdata);
    setFilteredDataSource(myFavdata);
    // console.log(myFavdata);
  }

  function OnPressRefresh() {
    favdata();
  }

  const searchFilterFunction = text => {
    if (text) {
      const newData = updatedata.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(updatedata);
    }
  };

  function showTextInput() {
    setShow(true);
  }

  useFocusEffect(
    React.useCallback(() => {
      // console.log('useeff');
      favdata();
      // console.log(updatedata);
    }, []),
  );

  return (
    <SafeAreaView style={FavouriteScreenStyle.container}>
      <StatusBar backgroundColor={colors.darkblue} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TopViewCustCompo
          onPress={() => showTextInput()}
          isShowBackIcon={true}
          isShowSearch={true}
          MiddleTextName={strings.WISHLIST_SCREENAME}
          IconNameRight={'dots-vertical'}
          isShowRightIcon={true}
        />
        <View style={FavouriteScreenStyle.middleView}>
          {show && (
            <TextInput
              style={FavouriteScreenStyle.searchInput}
              autoCorrect={false}
              placeholder="Search here"
              placeholderTextColor={colors.lightGrey}
              onChangeText={text => searchFilterFunction(text)}></TextInput>
          )}
          <FlatList
            contentContainerStyle={{
              alignSelf: 'center',
              width: '100%',
            }}
            onScrollEndDrag={() => Keyboard.dismiss()}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            data={filteredDataSource}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({item}) => {
              return (
                <CustomView
                  info={item}
                  onPressImg={onPressClick}
                  refreshData={OnPressRefresh}
                />
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FavouriteScreen;
