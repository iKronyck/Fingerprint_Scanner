import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Keychain from 'react-native-keychain';
import StackAuth from '../../routes/auth';
import StackHome from '../../routes/home';
import {connect} from 'react-redux';

const Root = ({authorize}) => {
  const [authenticated, setAuthenticated] = useState(authorize);

  useEffect(() => {
    // verifySession();
  }, []);

  async function verifySession() {
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
    try {
      const credentials = await Keychain.getGenericPassword(options);
      if (credentials) {
        setAuthenticated(true);
        console.log('simon', credentials.username);
      } else {
        setAuthenticated(false);
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <NavigationContainer>
      {authorize ? <StackHome /> : <StackAuth />}
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  authorize: state.auth.authorize,
});

export default connect(mapStateToProps)(Root);
