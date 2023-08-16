import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../themes/const/colors';
import {SimpleCheckText} from '../text';
import {insertAddress} from '../../../database/sql';

const Custome_Modal = ({visible, setModalVisible, error, onPress}) => {
  const [addressType, setaddressType] = useState('Home');
  const [textcount, setTextCount] = useState(['0']);
  const [isDefault, setisDefault] = useState(false);
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const [errors, setErrors] = useState({});

  function changeColor(name) {
    if (addressType == name) {
      return colors.darkblue;
    } else {
      return colors.white;
    }
  }
  function changeTextclr(name) {
    if (addressType == name) {
      return colors.white;
    } else {
      return colors.grey;
    }
  }

  function GetValue(text) {
    var Value = text.length.toString();

    return setTextCount(Value);
  }

  const validate = () => {
    // console.log('hello');

    if (!address) {
      Alert.alert('Please input address');
      return false;
    }

    if (!city) {
      Alert.alert('Please input city');

      return false;
    }

    if (!zipCode) {
      Alert.alert('Please input zipCode');

      return false;
    }

    if (!addressType) {
      Alert.alert(' Please select checkbox');
      return false;
    }

    userAddressInsert();
  };
  const userAddressInsert = async () => {
    // var fullAddress = `${address}, ${city}, ${zipCode}`;
    // console.log(fullAddress, `${isDefault},${addressType}`);
    await insertAddress(address, city, zipCode, isDefault, addressType);
    onPress();
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View onPress={() => setModalVisible(false)} style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Address</Text>
          <View style={styles.inputView}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Address"
                error={errors.address}
                autoFocus={true}
                multiline={true}
                maxLength={80}
                onChangeText={text => {
                  setAddress(text);
                  GetValue(text);
                }}
                style={{
                  color: colors.black,
                  flex: 1,
                  fontSize: 16,
                }}></TextInput>

              <Text style={{alignSelf: 'flex-end', margin: 2}}>
                {textcount}/80
              </Text>
            </View>
            {error && (
              <Text
                style={{
                  marginLeft: 2,
                  color: colors.red,
                  fontSize: 10,
                  fontWeight: '500',
                }}>
                {error}
              </Text>
            )}
            <View style={styles.inputContainer2}>
              <TextInput
                error={errors.city}
                placeholder="City"
                onChangeText={text => {
                  setCity(text);
                }}
                style={{color: colors.black, flex: 1, fontSize: 16}}
              />
              {error && (
                <Text
                  style={{
                    marginTop: 4,
                    marginLeft: 2,
                    color: colors.red,
                    fontSize: 10,
                    fontWeight: '500',
                  }}>
                  {error}
                </Text>
              )}
            </View>
            <View style={styles.inputContainer2}>
              <TextInput
                placeholder="ZiP"
                error={errors.zipCode}
                keyboardType="numeric"
                onChangeText={text => {
                  setZipCode(text);
                }}
                style={{color: colors.black, flex: 1, fontSize: 16}}
              />
              {error && (
                <Text
                  style={{
                    marginTop: 4,
                    marginLeft: 2,
                    color: colors.red,
                    fontSize: 10,
                    fontWeight: '500',
                  }}>
                  {error}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.checkText}>
            <SimpleCheckText
              value={isDefault}
              onPress={setisDefault}
              viewText={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              checkstyle={{}}
              textStyle={{
                color: colors.darkblue,
                fontWeight: 'bold',
                fontSize: 14,
              }}
              text={'Save as default'}
            />
          </View>
          <View style={styles.BottomButton}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',

                borderWidth: 0.5,
                borderRadius: 10,
                borderColor: colors.grey,
              }}>
              <TouchableOpacity
                onPress={() => setaddressType('Home')}
                style={[
                  styles.btns,
                  {
                    backgroundColor: changeColor('Home'),
                    borderTopStartRadius: 10,
                    borderBottomStartRadius: 10,
                  },
                ]}>
                <Text style={[styles.btnText, {color: changeTextclr('Home')}]}>
                  Home
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.5,
                  height: '100%',
                  borderColor: colors.grey,
                }}
              />
              <TouchableOpacity
                onPress={() => setaddressType('Office')}
                style={[styles.btns, {backgroundColor: changeColor('Office')}]}>
                <Text
                  style={[styles.btnText, {color: changeTextclr('Office')}]}>
                  Office
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.5,
                  height: '100%',
                  borderColor: colors.grey,
                }}
              />

              <TouchableOpacity
                onPress={() => setaddressType('Other')}
                style={[
                  styles.btns,
                  {
                    backgroundColor: changeColor('Other'),
                    borderTopEndRadius: 10,
                    borderBottomEndRadius: 10,
                  },
                ]}>
                <Text style={[styles.btnText, {color: changeTextclr('Other')}]}>
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sumbit}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{marginHorizontal: 15}}>
              <Text style={{color: 'skyblue', fontWeight: 'bold'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                validate();
              }}>
              <Text style={{color: 'skyblue', fontWeight: 'bold'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Custome_Modal;

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
