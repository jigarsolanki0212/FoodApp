import './ignore/ignoreWarning';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './views/screen/Login/LoginScreen';
import RegisterScreen from './views/screen/Register/RegisterScreen';
import GetStarted from './views/screen/GetStarted/GetStarted';
import FavouriteScreen from './views/screen/FavouriteScreen/FavouriteScreen';
import MainScreen from './views/screen/MainScreen/MainScreen';
import DetailScreen from './views/screen/DetailScreen/DetailScreen';
import SplashScreen from './views/SplashScreen';
import Checkout from './views/screen/Checkout/Checkout';
import {store} from '../FoodRedux/Redux/ReduxStore';
import {Provider} from 'react-redux';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
          <Stack.Screen name="Checkout" component={Checkout} />

          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
