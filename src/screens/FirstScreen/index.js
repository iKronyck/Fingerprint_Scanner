import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import styles from './FirstScreen.style';
import Faceid from '../../assets/img/face-id.png';
import Touchid from '../../assets/img/touch-id.png';

const FirstScreen = () => {
  const [loading, setLoading] = useState(true);
  const [typeBiometric, setTypeBiometric] = useState('Touch');

  useEffect(() => {
    // verifyBiometrics();
  }, []);

  async function verifyBiometrics() {
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
  }

  async function getBiometrics() {
    // test
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

export default FirstScreen;
