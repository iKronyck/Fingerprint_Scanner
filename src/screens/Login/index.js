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
  AppState,
} from 'react-native';
import {CheckBox} from 'native-base';
import _ from 'lodash';
import {connect} from 'react-redux';
import {loginUser} from '../../actions';
import {showToast} from '../../utils/Toast';
import {
  getSupportBiometrics,
  saveInKeychain,
  readKeychain,
} from '../../utils/Biometrics';
import Faceid from '../../assets/img/face-id.png';
import Touchid from '../../assets/img/touch-id.png';
import ShowEye from '../../assets/img/show-eye.png';
import HideEye from '../../assets/img/hide-eye.png';
import styles from './Login.style';
import {users} from '../../utils/User';

const Login = ({loginUserInApp, user, useFinger, username}) => {
  useEffect(() => {
    verifyBiometrics();
    AppState.addEventListener('change', handleChange);
    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, []);

  const handleChange = newState => {
    if (newState === 'active') {
      verifyBiometrics();
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showBiometricsCheck, setBiometricsCheck] = useState(false);
  const [useFingerprint, setUseFingerprint] = useState(false);
  const [userName, setUsername] = useState(user);
  const [password, setPassword] = useState('');

  async function verifyBiometrics() {
    const verify = await getSupportBiometrics();
    if (verify) {
      setBiometricsCheck(true);
    } else {
      setBiometricsCheck(false);
    }
  }

  const changeView = show => {
    setShowPassword(show);
  };

  async function validateData() {
    if (userName && password) {
      login();
    } else if (!userName && !password) {
      showToast('User and password is required');
    } else {
      if (!userName) {
        showToast('The user is require');
      } else {
        showToast('The password is require');
      }
    }
  }

  async function login() {
    const searchUser = _.filter(users, {username: userName, password});
    if (searchUser && searchUser.length > 0) {
      if (useFingerprint) {
        await saveInKeychain(userName, password);
      }
      const {id, name, username} = searchUser[0];
      const userData = {
        id,
        name,
        username,
      };
      loginUserInApp({
        user: userData,
        authorize: true,
        useFinger: useFingerprint,
      });
    } else {
      showToast('Incorrect username or password');
    }
  }

  async function loginWithFinger() {
    const credentials = await readKeychain();
    if (credentials) {
      const searchUser = _.filter(users, {
        username: credentials.username,
        password: credentials.password,
      });
      if (searchUser && searchUser.length > 0) {
        const {id, name, username} = searchUser[0];
        const userData = {
          id,
          name,
          username,
        };
        loginUserInApp({
          user: userData,
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
              {!user && showBiometricsCheck && (
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
  user: state.auth.user.username,
  useFinger: state.auth.useFinger,
});

export default connect(
  mapStateToProps,
  {loginUserInApp: loginUser},
)(Login);
