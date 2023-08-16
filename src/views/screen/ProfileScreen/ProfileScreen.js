import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileScreenStyle from './style/ProfileScreenStyle';
import TopViewCustCompo from '../../components/TopViewCustCompo';

import strings from '../../../themes/const/strings';
import colors from '../../../themes/const/colors';
import {CustomText} from '../../components/text';
import Personal_info from './Personal_info';
import Order_info from './Order_info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDataOfUser} from '../../../database/sql';
import UserDetailsUpdateModal from '../../components/cust_modal/UserDetailsUpdateModal';

const ProfileScreen = ({navigation, visible}) => {
  const [show, setShow] = useState('personal');
  const [userDetails, setUserDetails] = useState();

  const [editAddressModal, setEditUserModal] = useState(false);
  const [existingData, setExistingData] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await AsyncStorage.getItem('userid');
    var datafromID = await getDataOfUser(user);
    var rows = datafromID.rows;
    if (rows.length == 0) {
      // console.log('no data found');
    } else {
      var item = rows.item(0);

      // console.log(item.user_id);
      setUserDetails(item);
    }

    // console.log(userDetails,"userdetails")
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.darkblue}}>
      <StatusBar backgroundColor={colors.darkblue} />
      {editAddressModal && (
        <Modal
          animationType="fade"
          visible={visible}
          transparent={true}
          onRequestClose={() => {
            setEditUserModal(false);
          }}>
          <UserDetailsUpdateModal
            setEditUserModal={setEditUserModal}
            existingData={existingData}
            onPress={() => {
              setEditUserModal(false);
            }}
            getuserData={getUserData}
          />
        </Modal>
      )}
      <TopViewCustCompo
        MiddleTextName={strings.My_PROFILE}
        isShowBackIcon={false}
        OnPressFav={() => {
          setExistingData(userDetails);
          setEditUserModal(true);
        }}
        IconNameRight={'pen'}
        isShowRightIcon={true}
      />
      <View style={ProfileScreenStyle.mainView}>
        <View style={ProfileScreenStyle.profileView}>
          <View style={{marginTop: -40}}>
            <Image
              resizeMode="contain"
              style={{width: '50%', height: '50%', alignSelf: 'center'}}
              source={require('../../../assets/User/user1.png')}></Image>
            <CustomText
              textStyle={{
                marginTop: 10,
                fontSize: 20,
                color: colors.white,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}
              text={userDetails?.fullname}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setShow('personal');
                  // console.log(show, 'setshow');
                }}>
                <CustomText
                  textStyle={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: colors.white,
                  }}
                  text={'Personal Info'}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 30,
                }}>
                |
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShow('order');
                  // console.log(show, 'setshow');
                }}>
                <CustomText
                  textStyle={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.white,
                  }}
                  text={'Order Info'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {show == 'personal' && <Personal_info userEmail={userDetails?.email} />}
        {show == 'order' && (
          <Order_info
            onClickNavigate={info => {
              // console.log(info, 'info');
              navigation.push('OrderDetailScreen', {orderDetails: info});
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
