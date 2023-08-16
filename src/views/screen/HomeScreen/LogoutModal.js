import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../../themes/const/colors';
import Icons from 'react-native-vector-icons/Ionicons';

const LogoutModal = ({onPressCancel, onPressLogout}) => {
  return (
    <View
      onPress={() => setModalVisible(setModalShow)}
      style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalHead}>Logout?</Text>

        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity onPress={onPressCancel} style={styles.btnbackstyle}>
          <Icons name="ios-close-outline" size={25} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLogout} style={styles.btnbackstyle}>
          <Icons name="ios-checkmark-outline" size={25} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#00000050',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    paddingBottom: 30,
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
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: -28,
  },

  modalHead: {
    marginTop: 5,
    color: colors.darkblue,
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalText: {
    marginVertical: 10,

    color: colors.darkblue,
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnbackstyle: {
    backgroundColor: colors.darkblue,
    borderRadius: 30,
    padding: 15,
  },
});
