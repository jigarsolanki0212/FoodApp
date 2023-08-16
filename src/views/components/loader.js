import React from 'react';

import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from 'react-native';
import colors from '../../themes/const/colors';

const Loader = ({visible = false}) => {
  const {width, height} = useWindowDimensions();
  return (
    visible && (
      <Modal style={{backgroundColor: 'red', height: '40%'}} transparent={true}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={colors.darkblue} />
          {/* <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
            Loading...
          </Text> */}
        </View>
      </Modal>
    )
  );
};

const style = StyleSheet.create({
  loader: {
  

    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    position: 'absolute',
    zIndex: 10,
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: 'center',
  },
});

export default Loader;
