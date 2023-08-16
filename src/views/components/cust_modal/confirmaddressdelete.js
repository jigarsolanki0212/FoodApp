import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../themes/const/colors';

const Confirm_address_delete = ({
  setModalVisible,
  onPress,
  address,
  deleteAddress,
}) => {
  // console.log(address);
  return (
    <View
      onPress={() => setModalVisible(setModalShow)}
      style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Delete</Text>
        <Text style={styles.modalText2}>Are you sure</Text>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity onPress={onPress} style={styles.btnbackstyle}>
            <Text style={styles.okbtn}>NO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteAddress(address.address_id)}
            style={styles.btnbackstyle}>
            <Text style={styles.okbtn}>YES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Confirm_address_delete;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#00000050',
  },

  modalView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  correctimg: {
    height: 60,
    width: 50,
  },
  modalText: {
    color: colors.darkblue,
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalText2: {
    marginTop: 8,
    color: colors.darkblue,
    fontSize: 16,
  },
  btnbackstyle: {
    marginTop: 12,
    marginHorizontal: 5,
    backgroundColor: colors.grey,
    borderRadius: 7,
  },
  okbtn: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
