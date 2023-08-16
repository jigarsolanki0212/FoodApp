import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../themes/const/colors';
import {Image} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [initialRouteName, setInitialRouteName] = useState('');

  useEffect(() => {
    authUser();
  }, []);
  useEffect(() => {
    console.log('initialRouteName', initialRouteName);
    if (initialRouteName == '') {
      return;
    }
    setTimeout(() => {
      navigation.replace(initialRouteName);
    }, 3000);
  }, [initialRouteName]);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userid');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData !== null) {
          console.log(userData, 'redirect to MainScreen');
          setInitialRouteName('MainScreen');
        } else {
          console.log(userData, 'redirect to GetStarted');
          setInitialRouteName('GetStarted');
        }
      } else {
        console.log(userData, 'else redirect to GetStarted');
        setInitialRouteName('GetStarted');
      }
    } catch (error) {
      console.log(userData, 'else redirect to RegisterScreen');
      setInitialRouteName('RegisterScreen');
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignContent: 'space-around',
        justifyContent: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={{height: 200, height: 200}}
        source={require('../assets/giphy.gif')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
