import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavouriteScreen from '../FavouriteScreen/FavouriteScreen';
import MyCartScren from '../MyCartScren/MyCartScren';
import colors from '../../../themes/const/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyDrawer from '../HomeScreen/DrawerNavigation';
import ProfileStack from '../../../navigations/ProfileStack';
import {getAllFavitem} from '../../../database/sql';
const MainScreen = () => {
  const [favTotal, setFavTotal] = useState();

  var cartItems = [];

  async function favdata() {
    var favouriteData = await getAllFavitem();
    var rows = favouriteData.rows;
    for (var i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      cartItems.push(item.item_id);
    }
    setFavTotal(cartItems.length);
  }
  useEffect(() => {
    favdata();
  }, [cartItems]);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.darkblue,
          height: 100,
          paddingTop: 20,
          paddingBottom: 20,
          borderTopWidth: 0,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
          } else if (route.name === 'MyCart') {
            iconName = focused ? 'ios-basket' : 'ios-basket-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return (
            <Ionicons
              type="Ionicons"
              name={iconName}
              color={color}
              size={size}
            />
          );
        },
        tabBarActiveTintColor: colors.white,
        tabBarLabelStyle: {paddingBottom: 5, fontSize: 15},
      })}>
      <Tab.Screen
        name="Main"
        component={MyDrawer}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarLabel: 'Favourite',
          tabBarBadge: favTotal,
          tabBarBadgeStyle: {
            backgroundColor: 'red',
            color: colors.white,
          },
        }}
      />
      <Tab.Screen
        name="MyCart"
        component={MyCartScren}
        options={{
          tabBarLabel: 'My Cart',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
