import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../themes/const/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataOfUser, updateUser } from '../../../database/sql';

const UserDetailsUpdateModal = ({
  visible,
  error,
  existingData,
  setEditUserModal,
  getuserData,
}) => {
  const [name, setFullname] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    console.log(existingData, 'existingData');
    setFullname(existingData?.fullname);
    setEmail(existingData?.email);
  }, []);

  const updateUserData = async () => {
    const user = await AsyncStorage.getItem('userid');
    var datafromID = await getDataOfUser(user);
    var rows = datafromID.rows;
    if (rows.length == 0) {
      console.log('no data found');
    } else {
      var item = rows.item(0);
      await updateUser(name, email, item.user_id);
      setEditUserModal(false);

      getuserData();
    }
  };

  return (
 
      <TouchableOpacity
        onPress={() => setEditUserModal(false)}
        style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Profile</Text>
          <View style={styles.inputView}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputContainer2}>
                <TextInput
                    value={name}
                  onChangeText={text => setFullname(text)}
                  style={{color: colors.black, flex: 1, fontSize: 16}}
                />
              </View>
              <Text style={styles.label}>Email</Text>

              <View style={styles.inputContainer2}>
                <TextInput
                    value={email}
                  onChangeText={text => {
                    setEmail(text);
                  }}
                  style={{color: colors.black, flex: 1, fontSize: 16}}
                />
              </View>
            </View>
          </View>

          <View style={styles.BottomButton}>
            <TouchableOpacity
              onPress={() => setEditUserModal(false)}
              style={styles.cancelBtn}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => updateUserData()}
              style={styles.updateBtn}>
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
  
  );
};

export default UserDetailsUpdateModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.modalTransparent,
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
    textAlign: 'center',
    color: colors.darkblue,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputView: {
    marginVertical: 10,
  },

  inputContainer2: {
    height: 43,
    backgroundColor: colors.lightblue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    paddingRight: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  BottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 40,
  },
  updateBtn: {},

  btnText: {
    textAlign: 'center',
    fontSize: 14,
    padding: 8,
    backgroundColor: colors.darkblue,
    borderRadius: 4,
    color: colors.white,
  },
  label: {
    marginVertical: 2,
    fontSize: 14,
    // color: colors.grey,
    paddingHorizontal: 2,
    marginTop: 0,
  },
});
