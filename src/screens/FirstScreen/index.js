import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import styles from './FirstScreen.style';
import Faceid from '../../assets/img/face-id.png';
import Touchid from '../../assets/img/touch-id.png';
import {connect} from 'react-redux';
import {redirectToHome} from '../../actions';
import Keychain from 'react-native-keychain';

const FirstScreen = ({dispatch, redirect, navigation, username, password}) => {
  const [loading, setLoading] = useState(true);
  const [typeBiometric, setTypeBiometric] = useState('Fingerprint');

  useEffect(() => {
    if (redirect) {
      navigation.navigate('Home');
    } else {
      verifyBiometrics();
      setLoading(false);
    }
  }, []);

  async function verifyBiometrics() {
    const haveBiometric = await Keychain.getSupportedBiometryType();
    console.log(haveBiometric);
    if (haveBiometric) {
      if (haveBiometric === 'Fingerprint') {
        setTypeBiometric('Fingerprint');
      } else if (haveBiometric === 'FaceID') {
        setTypeBiometric('FaceID');
      }
      Alert.alert(
        'Enter with fingerprint',
        'We have detected that you have a fingerprint, would you like to use it to log in?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'danger',
          },
          {text: 'Yes', onPress: () => getBiometrics()},
        ],
        {cancelable: false},
      );
    } else {
      // move a home
      redirectToHome({
        redirectToHome: true,
      });
      navigation.navigate('Home');
    }
  }

  async function getBiometrics() {
    const options =
      Platform.OS === 'ios'
        ? {
            accesible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
            accessControl:
              Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
          }
        : {
            accesible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
            rules: Keychain.SECURITY_RULES.NONE,
          };
    await Keychain.setGenericPassword(username, password, options);
    redirectToHome({
      redirectToHome: true,
    });
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        animated
        barStyle="light-content"
        backgroundColor={styles.screen.backgroundColor}
      />
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          {loading ? (
            <ActivityIndicator
              animating
              size="large"
              color={styles.loading.color}
              style={styles.loading}
            />
          ) : (
            <>
              {!loading && typeBiometric && typeBiometric === 'FaceID' ? (
                <Image style={styles.img} source={Faceid} />
              ) : (
                <Image style={styles.img} source={Touchid} />
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  redirect: state.auth.redirectToHome,
  username: state.auth.user.name,
  password: state.auth.user.password,
});

export default connect(
  mapStateToProps,
  {redirectToHome},
)(FirstScreen);
