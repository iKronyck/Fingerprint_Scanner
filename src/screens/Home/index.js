import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './Home.style';
import Person from '../../assets/img/person.png';
import {connect} from 'react-redux';
import {logout, destroySession} from '../../actions';

const Home = ({username, logoutInApp, destroySessionInApp, useFinger}) => {
  let clearTime = null;

  useEffect(() => {
    closeSessionInTime();
  }, []);

  function closeSessionInTime() {
    clearTime = setTimeout(() => {
      closeSession();
    }, 15000);
  }

  function closeSession() {
    clearTimeout(clearTime);
    if (useFinger) {
      logoutInApp();
    } else {
      destroySessionInApp();
    }
  }

  function logoutSession() {
    Alert.alert(
      'Close Session',
      'Dou you like close session?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'danger',
        },
        {text: 'Yes', onPress: () => closeSession()},
      ],
      {cancelable: false},
    );
  }

  return (
    <View style={styles.containerScreen}>
      <SafeAreaView style={styles.containerScreen}>
        <StatusBar
          translucent
          animated
          barStyle="light-content"
          backgroundColor={styles.containerScreen.backgroundColor}
        />
        <View style={styles.container}>
          <Image style={styles.image} source={Person} />
          <Text style={styles.firstText}>Welcome back</Text>
          <Text style={styles.secondText}>{username}</Text>
          <TouchableOpacity
            onPress={() => logoutSession()}
            style={styles.buttonLogout}>
            <Text style={styles.textButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  redirect: state.auth.redirectToHome,
  username: state.auth.user.name,
  useFinger: state.auth.useFinger,
});

export default connect(
  mapStateToProps,
  {logoutInApp: logout, destroySessionInApp: destroySession},
)(Home);
