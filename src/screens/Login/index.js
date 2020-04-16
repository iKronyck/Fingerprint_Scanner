import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Faceid from '../../assets/img/face-id.png';
import Touchid from '../../assets/img/touch-id.png';
import ShowEye from '../../assets/img/show-eye.png';
import HideEye from '../../assets/img/hide-eye.png';
import styles from './Login.style';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeView = show => {
    if (show) {
      Keyboard.dismiss();
    }
    setShowPassword(show);
  };

  async function login() {
    console.log(userName, password);
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
            </View>
            <TouchableOpacity onPress={() => login()} style={styles.button}>
              <Text style={styles.textButton}>Log In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default Login;
