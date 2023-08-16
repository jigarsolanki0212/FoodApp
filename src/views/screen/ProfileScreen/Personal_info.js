import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileScreenStyle from './style/ProfileScreenStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconProps from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../themes/const/colors';
import {CustomText} from '../../components/text';
import {getAddressOfUser, deleteAddressOfUser} from '../../../database/sql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Confirm_address_delete from '../../components/cust_modal/confirmaddressdelete';
import Edit_Address_Modal from '../../components/cust_modal/Edit_Address_Modal';
import Custome_Modal from '../../components/cust_modal/Custome_Modal';

const Personal_info = ({visible, userEmail}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editAddressModal, setEditAddressModal] = useState(false);
  const [flatAddress, setflatAddress] = useState([]);
  const [existingAddress, setExistingAddress] = useState();
  const [editAdrress, setEditAdrress] = useState(false);

  useEffect(() => {
    getUserAddress();
  }, []);

  function OnPressRefresh() {
    getUserAddress();
  }

  const getUserAddress = async () => {
    const user = await AsyncStorage.getItem('userid');
    var datafromID = await getAddressOfUser(user);
    var rows = datafromID.rows;
    var userAdd = [];
    var dataLength = rows.length;
    if (dataLength == 0) {
      setUserAddress([]);
      console.log('no data found');
    } else {
      for (let i = 0; i < dataLength; i++) {
        var item = rows.item(i);

        userAdd.push(item);
        // console.log(userAdd,'fddfdfdfdfdfdfd');
      }
      setUserAddress(userAdd);
    }

    // console.log(userDetails,"userdetails")
  };

  const deleteUserAddress = async address_id => {
    await deleteAddressOfUser(address_id);
    setModalShow(false);
    OnPressRefresh();
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
      }}>
      {modalVisible && (
        <Custome_Modal
          onPress={OnPressRefresh}
          setModalVisible={setModalVisible}
        />
      )}

      {modalShow && (
        <Modal
          animationType="fade"
          visible={visible}
          transparent={true}
          onRequestClose={() => {
            setModalShow(false);
          }}>
          <Confirm_address_delete
            setModalShow={setModalShow}
            address={flatAddress}
            onPress={() => {
              setModalShow(false);
            }}
            deleteAddress={address_id => {
              deleteUserAddress(address_id);
            }}
          />
        </Modal>
      )}
      {editAddressModal && (
        <Modal
          animationType="fade"
          visible={visible}
          transparent={true}
          onRequestClose={() => {
            setEditAddressModal(false);
          }}>
          <Edit_Address_Modal
            setEditAddressModal={setEditAddressModal}
            editAddress={editAddressModal}
            existingAddress={existingAddress}
            onPress={() => {
              setEditAddressModal(false);
            }}
            getUserAddress={getUserAddress}
          />
        </Modal>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: '1%'}}>
        <View style={ProfileScreenStyle.addressView}>
          <View style={ProfileScreenStyle.addressTop}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconProps
                color={colors.grey}
                size={18}
                name="location-on"></IconProps>
              <CustomText
                textviewstyl={{marginHorizontal: 5}}
                text={'Address'}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setEditAdrress(false);
                // setExistingAddress(item);
                setEditAddressModal(false);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 19, marginHorizontal: 2, color: 'skyblue'}}>
                +
              </Text>

              <CustomText
                textviewstyl={{marginHorizontal: 5}}
                textStyle={{color: 'skyblue'}}
                text={'Add New'}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={userAddress}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    backgroundColor: colors.grey,

                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    marginVertical: 5,
                    borderRadius: 8,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        size={18}
                        name={
                          item.address_type == 'Home'
                            ? 'home'
                            : item.address_type == 'Office'
                            ? 'home-city'
                            : 'home-group'
                        }
                      />
                      <CustomText
                        textStyle={{
                          fontSize: 16,
                          marginLeft: 5,
                          fontWeight: 'bold',
                          color: colors.black,
                        }}
                        text={item.address_type}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => {
                          setEditAdrress(true);
                          setExistingAddress(item);
                          setEditAddressModal(true);
                        }}>
                        <IconProps
                          color={'green'}
                          size={18}
                          name="edit-location"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setflatAddress(item);
                          setModalShow(true);
                        }}>
                        <IconProps
                          color={'red'}
                          size={18}
                          name="delete-forever"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{marginLeft: 23, marginRight: 30}}>
                    <CustomText
                      text={`${item.address_line_1},${item.city},${item.zip}`}
                    />
                  </View>
                </View>
              );
            }}
          />
          <View></View>
        </View>
        <View style={ProfileScreenStyle.emailView}>
          <View style={ProfileScreenStyle.emailTop}>
            <Icon color={colors.grey} size={18} name="mail"></Icon>

            <CustomText textviewstyl={{marginHorizontal: 5}} text={'Email'} />
          </View>
          <View style={{paddingHorizontal: 30}}>
            <CustomText
              textStyle={{
                color: colors.black,
                fontSize: 20,
                fontWeight: 'bold',
              }}
              text={userEmail}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Personal_info;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#00000050',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    color: colors.darkblue,
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputContainer: {
    height: 100,
    backgroundColor: colors.lightblue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingRight: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  inputContainer2: {
    backgroundColor: colors.lightblue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    paddingRight: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  checkText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btns: {
    flex: 1,
    // borderWidth: 0.5,
    // borderColor: colors.black,
    paddingVertical: 10,
  },
  btnText: {
    textAlign: 'center',
  },
  sumbit: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    paddingTop: 20,
  },
});
