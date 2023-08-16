import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../themes/const/colors';

const Modal_place_order = ({setModalVisible, onPress}) => {
  return (
    <View
      onPress={() => setModalVisible(setModalShow)}
      style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image
          style={styles.correctimg}
          resizeMode="contain"
          source={require('../../../assets/icons/correct.png')}
        />
        <Text style={styles.modalText}>Order Placed Successfully</Text>
        <TouchableOpacity onPress={onPress} style={styles.btnbackstyle}>
          <Text style={styles.okbtn}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modal_place_order;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems:'center',
    paddingHorizontal: 25,
    backgroundColor: '#00000050',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,

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
    marginTop: 15,

    color: colors.darkblue,
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnbackstyle: {
    marginTop: 15,

    backgroundColor: colors.darkblue,
    borderRadius: 5,
  },
  okbtn: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    color: colors.white,
    fontSize: 16,
    // fontWeight: 'bold',

    // backgroundColor:colors.darkblue
  },
});
