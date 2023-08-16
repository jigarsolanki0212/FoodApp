import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import HomeScreen from './HomeScreen';
import colors from '../../../themes/const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useState} from 'react';
import {getDataOfUser} from '../../../database/sql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutModal from './LogoutModal';

function CustomDrawerContent({props, navigation, visible}) {
  const [userDetails, setUserDetails] = useState();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

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
  const logAlert = () => {
    setModalShow(true);
  };

  const logout = async () => {
    var idofUser = await AsyncStorage.setItem('userid', '');
    navigation.replace('GetStarted');

    return idofUser;
  };

  return (
    <>
      {modalShow && (
        <Modal
          animationType="fade"
          visible={visible}
          transparent={true}
          onRequestClose={() => {
            setModalShow(false);
          }}>
          <LogoutModal
            setModalShow={setModalShow}
            onPressCancel={() => setModalShow(false)}
            onPressLogout={() => {
              logout();
            }}
          />
        </Modal>
      )}
      <DrawerContentScrollView
        contentContainerStyle={{paddingTop: 0}}
        {...props}>
        <View style={styles.topView}>
          <Text style={styles.text1Style}>Name: {userDetails?.fullname}</Text>
          <Text style={styles.text2Style}>Username: {userDetails?.email}</Text>
        </View>
        <TouchableOpacity onPress={logAlert} style={styles.iconView}>
          <View style={styles.btnView}>
            <Icon name="logout" style={styles.iconstyle} />

            <Text style={styles.logoutText}>Log out</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.btnView2}>
          <TouchableOpacity style={styles.iconView2}>
            <Icons name="feedback" style={styles.iconstyle2} />
          </TouchableOpacity>
          <Text style={styles.logoutText2}>Feedback</Text>
        </View>
      </DrawerContentScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  topView: {
    marginTop: 0,
    backgroundColor: colors.darkblue,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  text1Style: {
    fontSize: 15,
    color: colors.white,
    textAlign: 'left',
    marginTop: 30,
    paddingTop: 20,
  },
  text2Style: {
    fontSize: 15,
    color: colors.white,
    textAlign: 'left',
    paddingTop: 10,
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginHorizontal: 10,
  },

  iconstyle: {
    fontSize: 22,
    paddingHorizontal: 7,
    fontWeight: 'bold',
    color: colors.black,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkblue,
  },
  btnView2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    marginHorizontal: 10,
  },

  iconstyle2: {
    fontSize: 22,
    paddingHorizontal: 7,
    fontWeight: 'bold',
    color: colors.black,
  },
  logoutText2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkblue,
  },
});
const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {},
        headerShown: false,
        drawerPosition: 'right',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
export default MyDrawer;
