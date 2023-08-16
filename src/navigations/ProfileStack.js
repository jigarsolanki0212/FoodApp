
import { createStackNavigator } from '@react-navigation/stack';


import ProfileScreen from '../views/screen/ProfileScreen/ProfileScreen';
import OrderDetailScreen from '../views/screen/Orderdetail/OrderDetailScreen';

const ProfileStack = () => {

    const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
    </Stack.Navigator>
  );}



export default ProfileStack



