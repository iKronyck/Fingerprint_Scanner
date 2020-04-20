import {Platform, Alert} from 'react-native';
import {Toast} from 'native-base';

const toastConfig = {
  text: 'Test',
  duration: 2500,
  buttonText: 'Ok',
};

export const showToast = text => {
  if (Platform.OS === 'android') {
    Toast.show({...toastConfig, text});
  } else {
    Alert.alert(
      'Error',
      text,
      [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
};
