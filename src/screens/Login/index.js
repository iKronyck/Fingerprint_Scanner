import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {CheckBox} from 'native-base';
import Keychain from 'react-native-keychain';
import Faceid from '../../assets/img/face-id.png';
import Touchid from '../../assets/img/touch-id.png';
import ShowEye from '../../assets/img/show-eye.png';
import HideEye from '../../assets/img/hide-eye.png';
import styles from './Login.style';
import _ from 'lodash';
import {connect} from 'react-redux';
import {loginUser} from '../../actions';

const Login = ({loginUser, user, useFinger}) => {
  useEffect(() => {
    verifyBiometrics();
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [showBiometricsCheck, setBiometricsCheck] = useState(false);
  const [useFingerprint, setUseFingerprint] = useState(false);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const users = [
    {
      id: 1,
      name: 'Israel Alfaro',
      username: 'ihernandez',
      password: 'Applaudo',
    },
    {
      id: 1,
      name: 'Irvin Sanchez',
      username: 'isanchez',
      password: 'Applaudo',
    },
    {
      id: 1,
      name: 'Juan Menjivar',
      username: 'jmenjivar',
      password: 'Applaudo',
    },
    {
      id: 1,
      name: 'Lourdes Cañas',
      username: 'lcanas',
      password: 'Applaudo',
    },
  ];
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

  async function verifyBiometrics() {
    const verify = await Keychain.getSupportedBiometryType();
    if (verify) {
      setBiometricsCheck(true);
    }
  }

  const changeView = show => {
    setShowPassword(show);
  };

  async function validateData() {
    if (userName && password) {
      login();
    } else if (!userName && !password) {
      alert('User and password is required');
    } else {
      if (!userName) {
        alert('The user is require');
      } else {
        alert('The password is require');
      }
    }
  }

  async function login() {
    const searchUser = _.filter(users, {username: userName, password});
    if (searchUser && searchUser.length > 0) {
      if (useFingerprint) {
        await Keychain.setGenericPassword(userName, password, options);
      }
      const {id, name, username} = searchUser[0];
      const user = {
        id,
        name,
        username,
      };
      loginUser({
        user,
        authorize: true,
        useFinger: useFingerprint,
      });
    } else {
      alert('Incorrect username or password');
    }
  }

  async function loginWithFinger() {
    const credentials = await Keychain.getGenericPassword(options);
    console.log(credentials);
    if (credentials) {
      const searchUser = _.filter(users, {
        username: credentials.username,
        password: credentials.password,
      });
      if (searchUser && searchUser.length > 0) {
        const {id, name, username} = searchUser[0];
        const user = {
          id,
          name,
          username,
        };
        loginUser({
          user,
          authorize: true,
          useFinger: true,
        });
      }
    }
  }

  return (
    <View style={styles.containerScreen}>
      <SafeAreaView style={styles.containerScreen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          style={styles.containerScreen}>
          <StatusBar
            translucent
            animated
            barStyle="light-content"
            backgroundColor={styles.containerScreen.backgroundColor}
          />
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image style={styles.img} source={Faceid} />
              <Image style={styles.img} source={Touchid} />
            </View>
            <Text style={styles.text}>Face ID / FingerPrint</Text>
            <TextInput
              onChangeText={u => setUsername(u)}
              placeholder="Insert your username"
              value={userName}
              style={styles.input}
            />
            <View style={styles.inputContainer}>
              <View style={styles.secureTextContainer}>
                <TextInput
                  onChangeText={u => setPassword(u)}
                  value={password}
                  placeholder="Insert your password"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPressIn={() => changeView(true)}
                  onPressOut={() => changeView(false)}>
                  <View style={styles.eyeContainer}>
                    <Image
                      style={styles.eyeImage}
                      source={showPassword ? HideEye : ShowEye}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {!user.hasOwnProperty('username') && showBiometricsCheck && (
                <View style={styles.checkButton}>
                  <TouchableOpacity
                    onPress={v => setUseFingerprint(!useFingerprint)}
                    style={styles.checkContainer}>
                    <CheckBox
                      color={styles.eyeImage.tintColor}
                      checked={useFingerprint}
                      onPress={v => setUseFingerprint(!useFingerprint)}
                    />
                    <Text style={styles.textCheckbox}>Activate Footprint</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={() => validateData()}
              style={styles.button}>
              <Text style={styles.textButton}>Log In</Text>
            </TouchableOpacity>
            {useFinger && showBiometricsCheck && (
              <TouchableOpacity
                onPress={() => loginWithFinger()}
                style={styles.button2}>
                <Text style={styles.textButton}>Log In with Fingerprint</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  authorize: state.auth.authorize,
  user: state.auth.user,
  useFinger: state.auth.useFinger,
});

export default connect(
  mapStateToProps,
  {loginUser},
)(Login);
