import {Platform} from 'react-native';
import Keychain from 'react-native-keychain';

const options =
  Platform.OS === 'ios'
    ? {
        service: 'org.reactjs.native.example.Fingerprint',
        accesible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        authenticationType:
          Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
        rules: Keychain.SECURITY_RULES.AUTOMATIC_UPGRADE,
      }
    : {
        accesible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        rules: Keychain.SECURITY_RULES.AUTOMATIC_UPGRADE,
        authenticationPrompt: {
          title: 'Login with fingerprint',
          subtitle: 'Subtitle test',
          description: 'Put your finger in scanner for login the app',
          cancel: 'Cancel',
        },
      };

export const getSupportBiometrics = async () => {
  return await Keychain.getSupportedBiometryType();
};

export const saveInKeychain = async (user, password) => {
  return await Keychain.setGenericPassword(user, password, options);
};

export const readKeychain = async () =>
  await Keychain.getGenericPassword(options);

export const deleteKeychain = async () =>
  await Keychain.resetGenericPassword(options);
